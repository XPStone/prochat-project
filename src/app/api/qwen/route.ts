import { NextResponse } from 'next/server';


export async function POST(request: Request) {
    // 解析前端请求体的JSON数据
    const requestBody = await request.json();

    // 打印解析出的JSON数据
    console.log('Request Body:', requestBody);

    // 从请求体中解析出 messages 属性，若不存在则默认为空数组
    const { messages = [] }: Partial<{ messages: Array<any> }> = requestBody;

    // 在message中找到最后一个用户的消息，用于后续生成请求的content
    const lastUserMessage = messages.reverse().find(msg => msg.role === 'user');

    try {
        const apiKey = 'fastgpt-rstSKRN7or7i2wspEpzlzzndLz1KpcOtSUmSL0WmApm9JmMyc4wfbbfV'; // 你的 API 密钥
        // 生成返回前端的response
        const response = await fetch(
            'http://192.168.100.98:3000/api/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + apiKey,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [
                        {
                            dataId: lastUserMessage.id,
                            role: "user",
                            content: lastUserMessage.content,
                        },
                        {
                            dataId: "u838hntQL1mhO1oU2z0yQG4Z",
                            role: "assistant",
                            content: ""
                        }
                    ],
                    variables: {
                        cTime: new Date().toISOString()
                    },
                    appId: "664eb4d82013bd159d1d10bf",
                    chatId: "v6266rzo9c4n",
                    detail: false,
                    stream: false
                }),
            },
        );
        console.log("Response",response);
        const data = await response.json(); // 将响应体转换为Json数据
        console.log('Response Data:', data);
        return NextResponse.json(data); // 将解析后的数据作为Json返回
    } catch (error) {
        console.error('Error:', error);  // 错误处理时打印错误信息
        return NextResponse.error();
    }
}


// For NotStream
// import { NextResponse } from 'next/server';
//
// export async function POST(request: Request) {
//     // 解析前端请求体的JSON数据
//     const requestBody = await request.json();
//
//     // 打印解析出的JSON数据
//     console.log('Request Body:', requestBody);
//
//     // 从请求体中解析出 messages 属性，若不存在则默认为空数组
//     const { messages = [] }: Partial<{ messages: Array<any> }> = requestBody;
//
//     // 在message中找到最后一个用户的消息，用于后续生成请求的content
//     const lastUserMessage = messages.reverse().find(msg => msg.role === 'user');
//
//     try {
//         const apiKey = 'fastgpt-rstSKRN7or7i2wspEpzlzzndLz1KpcOtSUmSL0WmApm9JmMyc4wfbbfV'; // 你的 API 密钥
//         // 生成返回前端的response
//         const response = await fetch(
//             'http://192.168.100.98:3000/api/v1/chat/completions',
//             {
//                 method: 'POST',
//                 headers: {
//                     Authorization: 'Bearer ' + apiKey,
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     messages: [
//                         {
//                             dataId: lastUserMessage.id,
//                             role: "user",
//                             content: lastUserMessage.content,
//                         },
//                         {
//                             dataId: "u838hntQL1mhO1oU2z0yQG4Z",
//                             role: "assistant",
//                             content: ""
//                         }
//                     ],
//                     variables: {
//                         cTime: new Date().toISOString()
//                     },
//                     appId: "664eb4d82013bd159d1d10bf",
//                     chatId: "v6266rzo9c4n",
//                     detail: false,
//                     stream: false
//                 }),
//             },
//         );
//         const data = await response.json(); // 将响应体转换为Json数据
//         console.log('Response Data:', data);
//         return NextResponse.json(data); // 将解析后的数据作为Json返回
//     } catch (error) {
//         console.error('Error:', error);  // 错误处理时打印错误信息
//         return NextResponse.error();
//     }
// }

