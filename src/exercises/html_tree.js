// отфильтруем все пустые теги - убираем пустые

const htmlTree = {
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
          type: 'tag-leaf',
        },
        {
          name: 'input',
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

const filterEmpty = (tree) => {
  console.log('tree.children =', tree.children);
  const mapped = tree.children.map((node) => {
    if (node.type === 'tag-internal') {
      return filterEmpty(node);
    }
    return node;
  });
  console.log('mapped =', mapped);
  const filtered = mapped.filter((node) => {
    const { type } = node;
    switch (type) {
      case 'tag-internal': {
        const { children } = node;
        return children.length > 0;
      }
      case 'tag-leaf': {
        return true;
      }
      case 'text': {
        const { content } = node;
        return !!content;
      }
    }
  });
  console.log(JSON.stringify(filtered, null, ''));
  return { ...tree, children: filtered };
};

const fltr = filterEmpty(htmlTree);
// console.log(JSON.stringify(fltr, null, ' '));

const buildClass = (node) => (node.className ? `class=${node.className}` : '');

const buildHtml = (node) => {
  const { type, name } = node;
  switch (type) {
    case 'tag-internal': {
      const childrenView = node.children.map(buildHtml).join('');
      return `<${name}${buildClass(node)}>${childrenView}</${name}>`;
    }
    case 'tag-leaf':
      return `<${name}${buildClass(node)}>`;
    case 'text':
      return node.content;
  }
};

const filteredTree = filterEmpty(htmlTree);

const html = buildHtml(filteredTree);
console.log(html);
