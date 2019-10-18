export default (element: any, columns: any, cellValue: any) => {
  const findValueInObject = columns[cellValue].split('.');
    const value = findValueInObject.length === 1 ?
      element[findValueInObject] :
      element[findValueInObject[0]][findValueInObject[1]];

    return value ? value : '-';
};
