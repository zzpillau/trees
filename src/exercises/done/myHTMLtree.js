import _ from 'lodash';

const tree = {
  name: 'div',
  type: 'tag-internal',
  className: 'hexlet-community',
  children: [
    {
      name: 'div',
      type: 'tag-internal',
      className: 'old-class',
      children: [],
    },
    {
      name: 'div',
      type: 'tag-internal',
      className: 'old-class',
      children: [],
    },
  ],
};

const htmlTreeSource = {
  name: 'html',
  type: 'tag-internal',
  children: [
    {
      name: 'body',
      type: 'tag-internal',
      children: [
        {
          name: 'h1',
          type: 'tag-internal',
          children: [
            {
              name: '',
              type: 'text',
              content: 'Сообщество',
            },
          ],
        },
        {
          name: 'p',
          type: 'tag-internal',
          children: [
            {
              type: 'text',
              content: 'Общение между пользователями Хекслета',
            },
          ],
        },
        {
          name: 'hr',
          className: 'hexlet-community',
          type: 'tag-leaf',
        },
        {
          name: 'input',
          className: 'some-class',
          type: 'tag-leaf',
        },
        {
          name: 'div',
          type: 'tag-internal',
          className: 'hexlet-community',
          children: [
            {
              name: 'div',
              type: 'tag-internal',
              className: 'text-xs-center',
              children: [],
            },
            {
              name: 'div',
              type: 'tag-internal',
              className: 'fa fa-spinner',
              children: [],
            },
          ],
        },
      ],
    },
  ],
};

const changeClass = (tree, oldClass, newClass) => {
  const mapped = tree.children.map((node) => {
    const newNode = { ...node };
    console.log('newNode.name =', newNode.name);

    console.log('node.className =', node.className);
    console.log(node.type);
    console.log('oldClass', _.has(node, 'className'));
    console.log(node.className === oldClass);

    if (newNode.type === 'tag-internal') {
      if (_.has(newNode, 'className') && newNode.className === oldClass) {
        newNode.className = newClass;
      }
      return changeClass(newNode, oldClass, newClass);
    }
    console.log(newNode.className);

    if (_.has(newNode, 'className') && newNode.className === oldClass) {
      console.log('must be changed');
      newNode.className = newClass;
      console.log('CHANGED!!!');
    }
    return newNode;
  });
  console.log('mapped =', mapped);

  return { ...tree, children: mapped };
};

// console.log(changeClass(tree, 'old-class', 'new-class'));
const sourse = changeClass(htmlTreeSource, 'hexlet-community', 'new-class');
// console.log(JSON.stringify(sourse, null, ' '));
