import { DefaultColumnDef, MappingColumnDef, ErrorColumnDef, ColumnDef, MappableHeaderColumnDef } from '../utils/columnDefinitionHelpers';


export const testColumns = [
	ColumnDef('Editable', 'Edit Only', true, false, false, false),
	ColumnDef('Sortable', 'Sortable', false, true, false, false),
	ColumnDef('Resize', 'Resizable Only', false, false, true, false),
	ColumnDef('Filter', 'Filter Only', false, false, false, true),
	DefaultColumnDef('Default', 'Default', null , 1),
	MappingColumnDef('NonEditable', 'Read Only', null, 1)
];