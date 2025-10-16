import AppLayout from '@cloudscape-design/components/app-layout';
import NetworkDashboard from './index';

export default function Root() {
  return <AppLayout navigationHide toolsHide content={<NetworkDashboard />} contentType="default" />;
}
