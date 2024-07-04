import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    //const { messages = [] }: Partial<{ messages: Array<any> }> = await request.json();
    // 1-获取前端json并解析
    // 解析请求体的JSON数据
    const requestBody = await request.json();
    // 打印解析出的JSON数据
    console.log('Request Body:', requestBody);
    // 从请求体中解析出 messages 属性，若不存在则默认为空数组
    const { messages = [] }: Partial<{ messages: Array<any> }> = requestBody;
    // 打印解析出的 messages 以便调试
    console.log('Messages:', messages);

    try {
        const apiKey = 'sk-a78d81e16e4a4f78b7473a0ee2c7c94e'; // 你的 API 密钥
        const response = await fetch(
            'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
            {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + apiKey,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'qwen-turbo',
                    input: {
                        messages: [
                            {
                                role: 'system',
                                content: 'You are a helpful assistant.',
                            },
                            ...messages,
                        ],
                    },
                    parameters: {},
                }),
            },
        );
        const data = await response.json();
        console.log('Response Data:', data);  // 在这里打印后端返回的数据
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.error();
    }
}