import chalk from "chalk";

function beautifyCodeBlocks(text) {
  const codeRegex = /```([\s\S]*?)```/g;

  const formattedText = text.replace(codeRegex, (match, code) => {
    const lines = code.split('\n');

    let minIndentation = Infinity;
    for (const line of lines) {
      const indentation = line.match(/^\s*/)[0].length;
      if (indentation < minIndentation) {
        minIndentation = indentation;
      }
    }

   const formattedLines = lines.map(line => {
    const indentation = line.match(/^\s*/)[0].length;
    const indentedLine = ' '.repeat(indentation - minIndentation + 2) + line.trim();
    return chalk.cyan(indentedLine);
  });

  const formattedCode = formattedLines.join('\n');

  const emptyLine = '\n';
  const border = chalk.white('┌' + '─'.repeat(80) + '┐\n');
  const wrappedCode = chalk.white('│') + emptyLine + formattedCode + emptyLine + chalk.white('└' + '─'.repeat(80) + '┘');

  
  return border + wrappedCode;
  });

  return formattedText;
}

export default beautifyCodeBlocks;