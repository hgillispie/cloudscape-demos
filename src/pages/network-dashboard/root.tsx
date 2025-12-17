import '@cloudscape-design/global-styles/index.css';
import { applyMode, Mode } from '@cloudscape-design/global-styles';
import NetworkDashboard from './index';

applyMode(Mode.Light);

export default function Root() {
  return <NetworkDashboard />;
}
