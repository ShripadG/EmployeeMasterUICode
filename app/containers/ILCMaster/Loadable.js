/**
 *
 * Asynchronously loads the component for ILCMaster
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
