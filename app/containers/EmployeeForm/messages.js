/*
 * Employee Messages
 *
 * This contains all the text for the Employee container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Employee';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Employee container!',
  },
});
