/*
 * AuditLog Messages
 *
 * This contains all the text for the AuditLog container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.AuditLog';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the audit log container!',
  },
});
