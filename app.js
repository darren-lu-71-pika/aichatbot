document.getElementById('submit-btn').addEventListener('click', async () => {
    const userInput = document.getElementById('user-input').value;
    const outputDiv = document.getElementById('output');
    
    if (!userInput) {
        outputDiv.textContent = 'Please enter a prompt.';
        return;
    }
    
    outputDiv.textContent = '寶寶想一下拉比...';
    
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ``, // 替換為安全的 API Key
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo', 
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
                max_tokens: 200,  // 增加一些 tokens
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            const errorData = await response.text(); // 使用 text() 更穩妥
            throw new Error(`API error: ${errorData}`);
        }

        const data = await response.json();
        
        if (data.choices && data.choices[0]?.message?.content) {
            outputDiv.textContent = data.choices[0].message.content.trim() + '拉比';
        } else {
            outputDiv.textContent = '寶寶想不出話來拉比';
        }
    } catch (error) {
        outputDiv.textContent = `出錯了拉比: ${error.message}`;
        console.error('Full error:', error);
    }
});
