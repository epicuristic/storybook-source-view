import React from 'react';
import { addons, types } from '@storybook/manager-api';
import { AddonPanel } from '@storybook/components';
import SourceCodePanel from './components/SourceCodePanel'

const ADDON_ID = 'sourceCodeAddon';
const PANEL_ID = `${ADDON_ID}/panel`;

addons.register(ADDON_ID, (api) => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Source Code',
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        <SourceCodePanel />
      </AddonPanel>
    ),
  });
});
