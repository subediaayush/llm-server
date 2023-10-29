
const applyCommand = (command: string, args: any) => {
    const regex = /\${([A-Za-z0-9_]+?)}/g;
    const found = command.match(regex);
    found?.forEach(s => {
        var key = s.replace(/[\\$\\{\\}]/g, '')
        if (key) {
            var value = args[key]
            if (value) command = command.replace(s, value)
        }
    })
    
    return command
}

export { applyCommand }