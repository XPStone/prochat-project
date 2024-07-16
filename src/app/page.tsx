// 'use client';
// import { useState, useEffect } from 'react'
// import { ProChat } from '@ant-design/pro-chat';
// import { useTheme } from 'antd-style';
//
// export default function Home() {
//
//     const theme = useTheme();
//     const [showComponent, setShowComponent] = useState(false)
//
//     useEffect(() => setShowComponent(true), [])
//
//     return (
//         <div
//             style={{
//                 backgroundColor: theme.colorBgLayout,
//             }}
//         >
//             {
//                 showComponent && <ProChat
//                     style={{
//                         height: '100vh',
//                         width: '100vw',
//                     }}
//                     request={async (messages) => {
//                         const response = await fetch('/api/qwen', {
//                             method: 'POST',
//                             body: JSON.stringify({ messages: messages }),
//                         });
//                         const data = await response.json();
//                         return new Response(data.output?.text);
//                     }}
//                 />
//             }
//         </div>
//     );
// }



// FastGPT Stream
'use client'; // 声明这是一个客户端组件
import { useState, useEffect, useRef } from 'react'; // 导入React的钩子函数
import { ProChat } from '@ant-design/pro-chat'; // 导入ProChat组件
import { useTheme } from 'antd-style';

export default function Home() {
    const theme = useTheme(); // 获取主题
    const [showComponent, setShowComponent] = useState(false); // 定义state变量，用于控制组件的显示
    // 通过useRef可以确保我们总是能够访问到当前的 AbortController 实例，来终止请求
    const abortControllerRef = useRef(new AbortController());
    // const proChatRef = useRef<ProChatChatReference | null>(null);

    // 使用useEffect钩子在组件挂载时设置showComponent为true
    useEffect(() => {
        setShowComponent(true);

        // 动态加载watermark.js
        // 0-调用浏览器的URLSearchParams API，获取username参数
        const urlParams = new URLSearchParams(window.location.search);
        const username = urlParams.get('username') || 'DefaultUser';
        // 1-创建一个script元素，将src属性设置为watermark.js的路径
        const script = document.createElement('script');
        script.src = '/js/watermark.js';
        // 2-script加载完成后，调用watermarker属性的init方法
        script.onload = () => {
            if (window.watermark) {
                window.watermark.init({
                    watermark_txt: `${username}`,
                    watermark_x_space: 100,       // 水印x轴间隔
                    watermark_y_space: 50,       // 水印y轴间隔
                    watermark_color: '#5579ee', // 水印字体颜色
                    watermark_fontsize: '24px', // 水印字体大小
                    watermark_alpha: 0.5, // 水印透明度
                    watermark_width: 200, // 水印宽度
                    watermark_height: 200, // 水印长度
                });
            }
        };
        // 3-将script元素加入到body中
        document.body.appendChild(script);

        // 清理script标签
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // const handleStop = () => {
    //     abortControllerRef.current.abort(); // 终止请求
    // };

    return (
        <div style={{ backgroundColor: theme.colorBgLayout }}>
            {showComponent &&  // 条件渲染，如果showComponent为true则显示ProChat组件
                <ProChat
                    style={{ height: "100vh", width: "100vw" }}
                    // 定义ProChat的请求处理函数
                    request={async (messages) => {
                        const abortController = new AbortController();
                        abortControllerRef.current = abortController;

                        // 1-发送POST请求到/api/qwenstream，包含消息和stream参数
                        const response = await fetch('/api/qwenstream', {
                            method: 'POST',
                            body: JSON.stringify({ messages: messages, stream: true }),
                            signal: abortController.signal, // 将信号传递给fetch请求
                        });

                        // const mockResponse = new MockSSEResponse(dataArray);
                        // const response = mockResponse.getResponse();

                        console.log('Response from api:', response);

                        if (!response.ok || !response.body) { // 检查响应是否正常
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }

                        const reader = response.body.getReader(); // 获取响应体的读取器
                        const decoder = new TextDecoder('utf-8'); // 创建UTF-8解码器
                        const encoder = new TextEncoder(); // 创建编码器

                        let buffer = ''; // 缓冲区用于存储未处理完的消息

                        // 创建一个可读流readableStream，用于逐步处理响应体
                        const readableStream = new ReadableStream({
                            async start(controller) {

                                async function push() {
                                    try {
                                        // 拉取响应流中的标志位done与二进制的数据value
                                        const { done, value } = await reader.read();
                                        console.log("VALUE", value);
                                        if (done) {
                                            if (buffer.length > 0) { // 处理剩余的缓冲区内容
                                                handleChunk(buffer, controller, encoder);
                                            }
                                            controller.close(); // 关闭流
                                            return;
                                        }
                                        // 解码Uint8Array的value到字符串，并加入缓冲区buffer
                                        buffer += decoder.decode(value, { stream: true });

                                        let boundary = buffer.indexOf('\n'); // 查找缓冲区中的换行符
                                        // 循环查找缓冲区的换行符
                                        while (boundary !== -1) {
                                            // 提取一份完整的消息
                                            const completeMessage = buffer.slice(0, boundary).trim();
                                            buffer = buffer.slice(boundary + 1); // 更新缓冲区
                                            // 处理以'data: '开头的消息
                                            if (completeMessage.startsWith('data: ')) {
                                                let completeMessageTemp = completeMessage.replace('data: ', '').trim();
                                                if (completeMessageTemp === '[DONE]') { // 如果消息是[DONE]，关闭流:因为[Done]无法解析，会报Undefined
                                                    controller.close();
                                                    return;
                                                }
                                                console.log('This is Message', completeMessageTemp);
                                                // 处理消息块：将字符串解析为Json对象，并放入Controller
                                                handleChunk(completeMessageTemp, controller, encoder);
                                            }
                                            boundary = buffer.indexOf('\n'); // 查找下一个换行符
                                        }
                                        push(); // 递归继续读取数据
                                    } catch (err) {
                                        if (err instanceof Error) {
                                            if (err.name === 'AbortError') {
                                                console.log('Fetch aborted');
                                                buffer = '';
                                                reader.cancel();
                                            } else {
                                                console.error('读取流中的数据时发生错误', err);
                                                controller.error(err); // 处理读取错误
                                            }
                                        } else {
                                            console.error('Unexpected error', err);
                                            controller.error(new Error('Unexpected error'));
                                        }
                                    }
                                }
                                push(); // 开始读取数据
                            }
                        });

                        // 处理消息块
                        function handleChunk(chunk: string, controller: ReadableStreamDefaultController<any>, encoder: TextEncoder) {

                            try {
                                if (!chunk) {
                                    throw new Error("No valid JSON found in the message");
                                }
                                const parsed = JSON.parse(chunk); // 解析JSON消息

                                if (parsed.choices && parsed.choices[0] && parsed.choices[0].delta) {
                                    controller.enqueue(encoder.encode(parsed.choices[0].delta.content)); // 将消息内容加入队列
                                }
                            } catch (err) {
                                if (err instanceof Error) {
                                    console.error('处理chunk时发生错误', err);
                                    controller.error(err); // 处理消息块错误
                                } else {
                                    console.error('Unexpected error', err);
                                    controller.error(new Error('Unexpected error'));
                                }
                            }
                        }

                        return new Response(readableStream); // 返回可读流readable Stream
                    }}
                />
            }
        </div>
    );
}
