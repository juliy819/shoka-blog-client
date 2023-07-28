// 引入 echarts 核心模块
import * as echarts from 'echarts/core';
// 引入饼图
import { PieChart } from 'echarts/charts';
// 引入图例、提示框，标题组件
import { LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components';
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器
import { CanvasRenderer } from 'echarts/renderers';

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

export default echarts;
