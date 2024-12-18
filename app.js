document.getElementById('submit-btn').addEventListener('click', async () => {
    const userInput = document.getElementById('user-input').value;
    const outputDiv = document.getElementById('output');
    
    if (!userInput) {
        outputDiv.textContent = 'Please enter a prompt.';
        return;
    }
    
    outputDiv.textContent = '寶寶想一下';
    
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `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`, // 使用環境變數
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini', // 修正模型名稱
                messages: [
                    {
                        role: 'system',
                        content: '你叫雪拉比或是時拉比，從未來穿越時光而來的寶可夢。一般認為只要時拉比出現，就會有光明的未來在等著我們。講話都要用「拉比」結尾。',
                    },
                    {
                        role: 'user',
                        content: userInput,
                    },
                ],
                max_tokens: 150, // 建議略微增加
                temperature: 0.7, // 添加溫度參數控制隨機性
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error.message || 'API request failed');
        }

        const data = await response.json();
        
        if (data.choices && data.choices[0]) {
            outputDiv.textContent = data.choices[0].message.content.trim();
        } else {
            outputDiv.textContent = 'No response from API.';
        }
    } catch (error) {
        outputDiv.textContent = `Error: ${error.message}`;
        console.error('Full error:', error);
    }
});
