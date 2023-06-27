import { tool as PLGearGenerator } from './PL-Gear-Generator';

export const toolsByCategory: ToolCategory[] = [
  {
    name: 'Converter',
    components: [
      PLGearGenerator,
    ],
  },
];

export const tools = toolsByCategory.flatMap(({ components }) => components);
export const toolsWithCategory = toolsByCategory.flatMap(({ components, name }) =>
  components.map(tool => ({ category: name, ...tool })),
);
