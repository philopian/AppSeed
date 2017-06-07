export const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    sessionStorage.setItem('state', JSON.stringify(state));
  } catch (err) {
    console.log(err);
    return undefined;
  }
};