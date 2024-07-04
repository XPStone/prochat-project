export class MockSSEResponse {
    constructor(dataArray, delay = 300) {
        this.dataArray = dataArray;
        this.delay = delay;
        this.stream = new ReadableStream({
            start: (controller) => {
                this.controller = controller;
                this.pushData();
            },
        });
    }

    pushData() {
        if (this.dataArray.length === 0) {
            this.controller.close();
            return;
        }
        const chunk = this.dataArray.shift();
        this.controller.enqueue(new TextEncoder().encode(chunk));
        setTimeout(() => this.pushData(), this.delay);
    }

    getResponse() {
        return new Response(this.stream);
    }
}
