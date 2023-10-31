
const applyCommand = (command: string[], args: any) => {
    return command.map(c => {
        const regex = /\${([A-Za-z0-9_]+?)}/g;
        const found = c.match(regex);
        found?.forEach(s => {
            var key = s.replace(/[\\$\\{\\}]/g, '')
            if (key) {
                var value = args[key]
                if (value) c = c.replace(s, value)
            }
        })
        
        return c
    })
}

export { applyCommand }