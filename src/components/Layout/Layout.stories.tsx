import { Layout } from './Layout';

export default {
  title: 'Layout/Layout',
  component: Layout,
  parameters: {
    docs: {
      description: {
        component:
          'Główny kontener layoutu dashboardu. Zapewnia elastyczny układ (flex lub grid), obsługuje kierunek, pełną wysokość oraz przekazuje style i klasy.',
      },
    },
  },
};

const Box = ({ color = '#eee', children }: { color?: string; children: any }) => (
  <div style={{ background: color, padding: 16, borderRadius: 8 }}>{children}</div>
);

export const Default = () => (
  <Layout>
    <Box color="#cce4ff">Header</Box>
    <Box color="#e6f7e6">Content</Box>
    <Box color="#ffe6e6">Footer</Box>
  </Layout>
);

export const Horizontal = () => (
  <Layout direction="horizontal">
    <Box color="#cce4ff">Sidebar</Box>
    <Box color="#e6f7e6">Content</Box>
  </Layout>
);

export const CustomClassAndStyle = () => (
  <Layout className="custom-class" style={{ border: '2px dashed #888' }}>
    <Box>Custom class & style</Box>
  </Layout>
);
