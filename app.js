document.getElementById('submit-btn').addEventListener('click', async () => {
    const userInput = document.getElementById('user-input').value;
    const outputDiv = document.getElementById('output');

    if (!userInput) {
        outputDiv.textContent = 'Please enter a prompt.';
        return;
    }

    outputDiv.textContent = 'Loading...';

    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': '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', // 替换为你的 OpenAI API 密钥
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini-2024-07-18', // 使用的 AI 模型
                prompt: 你叫雪拉比或是時拉比，從未來穿越時光而來的寶可夢。一般認為只要時拉比出現，就會有光明的未來在等著我們。講話都要用「拉比」結尾,
                max_tokens: 100, // 限制返回的字符数
            }),
        });

        const data = await response.json();
        outputDiv.textContent = data.choices[0].text.trim();
    } catch (error) {
        outputDiv.textContent = `Error: ${error.message}`;
    }
});
