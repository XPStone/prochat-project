import { NextResponse } from 'next/server';


// 定义一个处理流式响应的类
export class StreamHandler {
    // 控制器实例：控制流的推送与关闭
    private controller!: ReadableStreamDefaultController<Uint8Array>;
    // 可读流实例：处理从fetchResponse接收到的数据，可读流实例创建时需要控制器实例
    private stream: ReadableStream<Uint8Array>;


    /**
     * 构造函数
     * @param fetchResponse - fetch请求的响应对象
     * @param delay - 每次读取之间的延迟（毫秒），默认为0
     */
    constructor(
        private fetchResponse: Response,
        private delay: number = 0,
    ) {
        this.stream = new ReadableStream({
            start: (controller) => {
                this.controller = controller; // 存储流的控制器
                this.pushData(); // 开始推送数据
            },
        });
    }

    /**
     * 推送数据方法，从fetchResponse读取数据并推送到流中
     */
    private pushData() {
        // 获取流式数据的读取器，reader可以从ReadableStream中逐步读取数据直到流结束
        const reader = this.fetchResponse.body!.getReader();
        // 调用reader.read()方法可以逐步获取流数据
        const read = () => {
            reader.read().then(({ done, value }) => {
                if (done) {
                    this.controller.close();
                    return;
                }
                if (value) {
                    this.controller.enqueue(value);
                }
                setTimeout(() => read(), this.delay);
            });
        };
        read();
    }

    /**
     * @returns 获取一个新的Response对象，包含处理后的流式数据
     */
    getResponse() {
        return new Response(this.stream);
    }
}

// 处理POST请求的主函数
export async function POST(request: Request) {
    // 解析前端请求体的JSON数据
    const requestBody = await request.json();
    // 从请求体中解析出 messages 属性，若不存在则默认为空数组
    const { messages = [] }: Partial<{ messages: Array<any> }> = requestBody;
    console.log('Request Messages:', messages);
    // 在messages中找到最后一个用户的消息，用于后续生成请求的content
    const lastUserMessage = messages.reverse().find(msg => msg.role === 'user');

    try {
        const apiKey = 'fastgpt-rstSKRN7or7i2wspEpzlzzndLz1KpcOtSUmSL0WmApm9JmMyc4wfbbfV'; // 你的 API 密钥
        const controller = new AbortController();
        const { signal } = controller;

        // 生成返回前端的response，向后端API发送请求
        const fetchResponse = await fetch(
            'http://192.168.100.98:3000/api/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + apiKey, // 传递API密钥
                    'Content-Type': 'application/json', // 设置请求头为JSON格式
                },
                body: JSON.stringify({
                    messages: [
                        {
                            dataId: lastUserMessage.id, // 用户消息的ID
                            role: "user",
                            content: lastUserMessage.content, // 用户消息的内容
                        },
                        {
                            dataId: "u838hntQL1mhO1oU2z0yQG4Z", // 假设的助手消息的ID
                            role: "assistant",
                            content: "" // 初始助手消息内容为空
                        }
                    ],
                    variables: {
                        cTime: "2024-06-28 10:18:07 Friday" // 当前时间作为变量传递
                    },
                    appId: "664eb4d82013bd159d1d10bf", // 应用ID
                    chatId: "v6266rzo9c4n", // 聊天ID
                    detail: false,
                    stream: true // 请求流式响应
                }),
               signal// 传递中止信号
            },
        );

        // 检查响应状态，如果不成功则抛出错误
        if (!fetchResponse.ok) {
            throw new Error(`HTTP error! status: ${fetchResponse.status}`);
        }
        // 检查响应体是否存在，如果不存在则抛出错误
        if (!fetchResponse.body) {
            throw new Error('Response body is null');
        }

        // 使用StreamHandler处理fetchResponse并返回流式响应
        const handler = new StreamHandler(fetchResponse);
        return handler.getResponse();

    } catch (error) {
        // 处理任何错误，并返回错误响应
        console.error('Error:', error);
        return NextResponse.error();
    }
}
