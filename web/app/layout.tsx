import './global.css';
import { UiLayout } from '@/components/ui/ui-layout';
import { ClusterProvider } from '@/components/cluster/cluster-data-access';
import { SolanaProvider } from '@/components/solana/solana-provider';
import {AppProvider} from '@/providers/app-provider'
import { ReactQueryProvider } from './react-query-provider';

export const metadata = {
  title: 'Shadow Trading',
  description: '',
};

interface linkType {
  label: string;
  path: string;
}

const links: linkType[] = [
  { label: 'Account', path: '/account' },
  // { label: 'Clusters', path: '/clusters' },
  // { label: 'TeamShadow Program', path: '/team-shadow' },
  { label: 'Copy Trading', path: '/copy-trading' },
  { label: 'My Trade', path: '/my-trade' },
  { label: 'Staking STL', path: '/staking-stl' },
  { label: 'Swap STL', path: '/swap-stl' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <ClusterProvider>
            <SolanaProvider>
              <AppProvider>
                <UiLayout links={links}>{children}</UiLayout>
              </AppProvider>
            </SolanaProvider>
          </ClusterProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
