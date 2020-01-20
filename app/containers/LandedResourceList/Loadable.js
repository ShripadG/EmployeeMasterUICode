/**
 *
 * Asynchronously loads the component for Employee
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
