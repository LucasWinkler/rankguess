type ChangelogProps = {
  version: string;
  date: string;
  changes: {
    title: string;
    change: string[];
  }[];
};

const changelog: ChangelogProps[] = [
  {
    version: '1.3.0',
    date: 'March 5, 2023',
    changes: [
      {
        title: 'Lorem ipsum dolor',
        change: [
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda, magni?',
        ],
      },
      {
        title: 'Another System',
        change: [
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda, magni?',
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo eaque repudiandae vel, cum excepturi, nisi autem officia quia dolorem temporibus ducimus, voluptate vero sed ullam.',
        ],
      },
    ],
  },
  {
    version: '1.2.0',
    date: 'March 5, 2023',
    changes: [
      {
        title: 'Lorem ipsum dolor sit amet',
        change: [
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda, magni?',
        ],
      },
      {
        title: 'Another',
        change: [
          'Lorem, ipsum adipisicing?',
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo eaque repudiandae vel, cum excepturi, nisi autem officia quia dolorem temporibus ducimus, voluptate vero sed ullam.',
        ],
      },
    ],
  },
  {
    version: '1.1.0',
    date: 'March 5, 2023',
    changes: [
      {
        title: 'Lorem sit amet',
        change: [
          'Created an authentication system using NextAuths Google Provider and Prisma',
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda, magni?',
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo eaque repudiandae vel, cum excepturi, nisi autem officia quia dolorem temporibus ducimus, voluptate vero sed ullam.',
        ],
      },
    ],
  },
  {
    version: '1.0.0',
    date: 'March 5, 2023',
    changes: [
      {
        title: 'Lorem, ipsum dolor.',
        change: [
          'Lorem ipsum dolor sit amet consectetur.',
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa sapiente iste suscipit, rem tempore labore.',
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam adipisci, cumque expedita accusamus nisi esse alias magnam unde officia commodi.',
        ],
      },
    ],
  },
];

export default changelog;
