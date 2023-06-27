import { ArrowsShuffle } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'PL Gear Generator',
  path: '/PL-Gear-Generator',
  description: 'Quickly easily generate PL curves for Dispatcher in register value.',
  keywords: ['PL', 'Gear', 'Generator'],
  component: () => import('./PL-Gear-Generator.vue'),
  icon: ArrowsShuffle,
  createdAt: new Date('2023-06-26'),
});
