// FOR ALI_YUN by me
// "use client";
// import { useState, useEffect } from "react";
// import { ProChat } from "@ant-design/pro-chat";
// import { useTheme } from "antd-style";
//
// export default function Home() {
//     const theme = useTheme();
//     const [showComponent, setShowComponent] = useState(false);
//
//     useEffect(() => setShowComponent(true), []);
//
//     return (
//         <div style={{ backgroundColor: theme.colorBgLayout }}>
//             {showComponent && (
//                 <ProChat
//                     style={{ height: "100vh", width: "100vw" }}
//                     helloMessage={
//                         "欢迎使用 ProChat ，我是你的专属机器人，这是我们的 Github：[ProChat](https://github.com/ant-design/pro-chat)"
//                     }
//                     request={async (messages) => {
//                         try {
//                             const response = await fetch('/api/aliyun', {
//                                 method: 'POST',
//                                 headers: {
//                                     'Content-Type': 'application/json'
//                                 },
//                                 body: JSON.stringify({ messages: messages })
//                             });
//                             const data = await response.json();
//                             // 确保这里的返回值是对 ProChat 组件友好的
//                             return new Response(JSON.stringify({ text: data.output?.text }));
//                         } catch (error) {
//                             console.error('API call failed:', error);
//                             // 处理错误情况
//                             return new Response(JSON.stringify({ text: 'Error in API call' }));
//                         }
//                     }}
//                 />
//             )}
//         </div>
//     );
// }

// FOR ALI_YUN by default
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
//                         const response = await fetch('/api/aliyun', {
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

// // FOR FAST_GPT
// 'use client';
// import { useState, useEffect } from 'react';
// import { ProChat } from '@ant-design/pro-chat';
// import { useTheme } from 'antd-style';
//
// export default function Home() {
//     const theme = useTheme(); // 获取当前主题
//     const [showComponent, setShowComponent] = useState(false); // 控制组件是否显示的状态
//
//     useEffect(() => setShowComponent(true), []); // 组件挂载后设置showComponent为true
//
//     return (
//         <div style={{ backgroundColor: theme.colorBgLayout }}>
//             {showComponent && (
//                 <ProChat
//                     style={{ height: '100vh', width: '100vw' }}
//                     request={async (messages) => {
//                         // 请求后端的api/qwen,返回Response
//                         const response = await fetch('/api/qwen', {
//                             method: 'POST',
//                             body: JSON.stringify({ messages: messages }), // 将messages转换为JSON字符串作为请求体
//                         });
//                         console.log('Final Response Data:', response);
//                         //return response;
//                         const data = await response.json(); // 解析响应的JSON数据
//                         return new Response(data.choices[0].message.content);
//
//                     }}
//                 />
//             )}
//         </div>
//     );
// }

// FOR JUST_TEST
// "use client";
// import { useState, useEffect } from "react";
// import { ProChat } from "@ant-design/pro-chat";
// import { useTheme } from "antd-style";
//
// export default function Home() {
//     const theme = useTheme();
//     const [showComponent, setShowComponent] = useState(false);
//     useEffect(() => setShowComponent(true), []);
//     return (
//         <div
//             style={{
//                 backgroundColor: theme.colorBgLayout,
//             }}
//         >
//             {showComponent && (
//                 <ProChat
//                     style={{
//                         height: "100vh",
//                         width: "100vw",
//                     }}
//                     helloMessage={
//                         "欢迎使用 ProChat ，我是你的专属机器人，这是测试HelloMessage,这是我们的 Github：[ProChat](https://github.com/ant-design/pro-chat)"
//                     }
//                     request={async (messages) => {
//                         const mockedData: string = `这是一段模拟的对话数据。本次会话传入了${messages.length}条消息,只是PRO_CHAT的一个测试用例，如果有更多问题请链接API再来问我,习近平总书记代表党中央向全国广大共产党员致以节日问候 再过几天就是中国共产党103周年诞辰，习近平总书记代表党中央，向全国广大共产党员致以节日的问候！`;
//                         return new Response(mockedData);
//                     }}
//                 />
//             )}
//         </div>
//     );
// }
//

// FOR OPENAI
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
//                         const response = await fetch('/api/opnai', {
//                             method: 'POST',
//                             body: JSON.stringify({ messages: messages }),
//                         });
//                         return response
//                     }}
//                 />
//             }
//         </div>
//     );
// }

//FOR FASTSTREAM
//
'use client'; // 声明这是一个客户端组件
import {useState, useEffect, useRef} from 'react'; // 导入React的钩子函数
import {ProChat, ProChatInstance} from '@ant-design/pro-chat'; // 导入ProChat组件
import { useTheme } from 'antd-style';

export default function Home() {
    const theme = useTheme(); // 获取主题
    const [showComponent, setShowComponent] = useState(false); // 定义state变量，用于控制组件的显示
    const [abortController, setAbortController] = useState<AbortController | null>(null); // 用于控制请求中止


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
                    watermark_txt: `${username}` ,
                    watermark_x_space:100,       //水印x轴间隔
                    watermark_y_space:50,       //水印y轴间隔
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


    return (
        <div style={{ backgroundColor: theme.colorBgLayout }}> {/* 使用主题的背景色 */}
            {showComponent && ( // 条件渲染，如果showComponent为true则显示ProChat组件
                <ProChat
                    style={{ height: '100vh', width: '100vw' }}
                    // 定义ProChat的请求处理函数
                    request={async (messages) => {
                        const controller = new AbortController(); // 创建AbortController实例
                        setAbortController(controller); // 将实例存入state
                        // 1-发送POST请求到/api/qwenstream，包含消息和stream参数
                        console.log("This is CONTROLLER_SIGNAL",controller.signal.aborted);
                        const response = await fetch('/api/qwenstream', {
                            method: 'POST',
                            body: JSON.stringify({ messages: messages, stream: true }),
                            signal:controller.signal,
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

                        // 创建一个可读流readableStream，用于逐步处理响应体
                        const readableStream = new ReadableStream({
                            async start(controller) {
                                let buffer = ''; // 缓冲区用于存储未处理完的消息
                                async function push() {
                                    try {
                                        // 拉取响应流中的标志位done与二进制的数据Value
                                        const { done, value } = await reader.read();
                                        console.log("VALUE",value);
                                        if (done) {
                                            if (buffer.length > 0) { // 处理剩余的缓冲区内容
                                                handleChunk(buffer, controller, encoder);
                                            }
                                            controller.close(); // 关闭流
                                            return;
                                        }
                                        // 解码Unit8Array的value到字符串，并加入缓冲区buffer
                                        buffer += decoder.decode(value, { stream: true });

                                        let boundary = buffer.indexOf('\n'); // 查找缓冲区中的换行符
                                        //循环查找换查找缓冲区的换行符
                                        while (boundary !== -1) {
                                            // 提取一份完整的消息
                                            const completeMessage = buffer.slice(0, boundary).trim();
                                            buffer = buffer.slice(boundary + 1); // 更新缓冲区
                                            // 处理以'data: '开头的消息
                                            if (completeMessage.startsWith('data: ')) {
                                                let completeMessageTemp = completeMessage.replace('data: ', '').trim();
                                                if (completeMessageTemp === '[DONE]') {// 如果消息是[DONE]，关闭流:因为[Done]无法解析,会报Undefined
                                                    controller.close();
                                                    return;
                                                }
                                                console.log('This is Message', completeMessageTemp);
                                                // 处理消息块：将字符串解析为Json对象，并放入Controller
                                                handleChunk(completeMessageTemp, controller, encoder);
                                            }
                                            boundary = buffer.indexOf('\n'); // 查找下一个换行符
                                        }

                                        push(); // 继续读取数据
                                    } catch (err) {
                                        console.error('读取流中的数据时发生错误', err);
                                        controller.error(err); // 处理读取错误
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
                                console.error('处理chunk时发生错误', err);
                                controller.error(err); // 处理消息块错误
                            }
                        }

                        return new Response(readableStream); // 返回可读流readable Stream
                    }}
                />
            )}
        </div>
    );
}

