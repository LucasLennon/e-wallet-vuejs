const PATTERN = [1e7] + -1e3 + -4e3 + -8e3 + -1e11;

function changeCharacter() {
    return Math.random() * 16;
}

function generateUUID() {
  return PATTERN.replace(
    /[018]/g,
    c => (c ^ (changeCharacter() & (15 >> (c / 4)))).toString(16)
  );
}

export default generateUUID;
