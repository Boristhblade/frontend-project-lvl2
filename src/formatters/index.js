import plain from './plain.js';
import json from './json.js';
import stylish from './stylish.js';

const pickFormater = (formaterName, tree) => {
  switch (formaterName) {
    case 'stylish':
      return stylish(tree); // Если сделать объектом, как в парсерах,
    case 'plain':
      return plain(tree); // Придется добавлять дефол кейс через тернарный оператор
    case 'json':
      return json(tree); // Так что мне кажется тут лучше свич
    default:
      return stylish(tree);
  }
};

export default pickFormater;
