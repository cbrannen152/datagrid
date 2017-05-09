import Immutable from 'immutable';

import * as columnDefinitions from './columnDefinitions';

export default Immutable.fromJS({

	testGrid: {
		name: 'testGrid',
		columns: columnDefinitions.testColumns,
		allowPaste: true,
		filterable: true
		
	}
});