import child_process from 'child_process';
const dirName = 'packages';
const cmd = 'git diff origin/master --name-only'; // --state 路径过长会被省略

export function diffMasterBranch() {
  // TODO: git fetch
  console.log('command:', cmd, '\n');
  const stdout = child_process.execSync(cmd);
  const updatedComps = stdout
    .toString()
    .split('\n')
    .filter(it => it.trim().startsWith(dirName))
    .map(text => {
      // 得到package目录下的文件夹名称
      text = text.trim().slice(dirName.length + 1);
      text = text.slice(0, text.indexOf('/'));
      return text;
    })
    .filter(name => /[A-Z]/.test(name[0])); // 仅保留大写字母开头的文件夹

  console.log('diff master branch result:', updatedComps, '\n');
  return new Set(updatedComps);
}
