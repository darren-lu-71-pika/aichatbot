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
                'Authorization': 'Bearer YOUR_API_KEY', // 替换为你的 OpenAI API 密钥
            },
            body: JSON.stringify({
                model: 'text-davinci-003', // 使用的 AI 模型
                prompt: userInput,
                max_tokens: 100, // 限制返回的字符数
            }),
        });

        const data = await response.json();
        outputDiv.textContent = data.choices[0].text.trim();
    } catch (error) {
        outputDiv.textContent = `Error: ${error.message}`;
    }
});
