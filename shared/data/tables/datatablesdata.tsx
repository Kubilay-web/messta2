import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell,  { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
//1Basic datatables

import dynamic from "next/dynamic";
const DataTableExtensions = dynamic(() => import("react-data-table-component-extensions"), { ssr: false });
const DataTable = dynamic(() => import("react-data-table-component"), { ssr: false });

import differenceBy from 'lodash/differenceBy'
// import DataTableExtensions from 'react-data-table-component-extensions'
// import DataTable from 'react-data-table-component'
import SpkButton from '@/shared/@spk-reusable-components/uielements/spk-button';

//Material ui Tables

interface Column {
	id: 'name' | 'code' | 'population' | 'size' | 'density';
	label: string;
	minWidth?: number;
	align?: 'right';
	format?: (value: number) => string;
}

const columns: readonly Column[] = [
	{ id: 'name', label: 'Name', minWidth: 170 },
	{ id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
	{
		id: 'population',
		label: 'Population',
		minWidth: 170,
		align: 'right',
		format: (value: number) => value.toLocaleString('en-US'),
	},
	{
		id: 'size',
		label: 'Size\u00a0(km\u00b2)',
		minWidth: 170,
		align: 'right',
		format: (value: number) => value.toLocaleString('en-US'),
	},
	{
		id: 'density',
		label: 'Density',
		minWidth: 170,
		align: 'right',
		format: (value: number) => value.toFixed(2),
	},
];

interface Data {
	name: string;
	code: string;
	population: number;
	size: number;
	density: number;
}

function createData(
	name: string,
	code: string,
	population: number,
	size: number,
): Data {
	const density = population / size;
	return { name, code, population, size, density };
}

const rows = [
	createData('India', 'IN', 1324171354, 3287263),
	createData('China', 'CN', 1403500365, 9596961),
	createData('Italy', 'IT', 60483973, 301340),
	createData('United States', 'US', 327167434, 9833520),
	createData('Canada', 'CA', 37602103, 9984670),
	createData('Australia', 'AU', 25475400, 7692024),
	createData('Germany', 'DE', 83019200, 357578),
	createData('Ireland', 'IE', 4857000, 70273),
	createData('Mexico', 'MX', 126577691, 1972550),
	createData('Japan', 'JP', 126317000, 377973),
	createData('France', 'FR', 67022000, 640679),
	createData('United Kingdom', 'GB', 67545757, 242495),
	createData('Russia', 'RU', 146793744, 17098246),
	createData('Nigeria', 'NG', 200962417, 923768),
	createData('Brazil', 'BR', 210147125, 8515767),
];

export default function StickyHeadTable() {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (_event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label="sticky table" className="table-bordered sticky-header-table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell className="!border-b !border-defaultborder dark:!border-defaultborder/10"
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row) => {
								return (
									<TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
										{columns.map((column) => {
											const value = row[column.id];
											return (
												<TableCell key={column.id} align={column.align} className="!border-b !border-defaultborder dark:!border-defaultborder/10">
													{column.format && typeof value === 'number'
														? column.format(value)
														: value}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData1(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows1 = [
  createData1('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData1('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData1('Eclair', 262, 16.0, 24, 6.0),
  createData1('Cupcake', 305, 3.7, 67, 4.3),
  createData1('Gingerbread', 356, 16.0, 49, 3.9),
];

export  function CustomizedTables() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table" className="table-bordered">
        <TableHead>
          <TableRow>
            <StyledTableCell>Dessert (100g serving)</StyledTableCell>
            <StyledTableCell align="right">Calories</StyledTableCell>
            <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows1.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row" className="!border-b !border-defaultborder dark:!border-defaultborder/10" >
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right" className="border-b">{row.calories}</StyledTableCell>
              <StyledTableCell align="right" className="border-b">{row.fat}</StyledTableCell>
              <StyledTableCell align="right" className="border-b">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right" className="border-b">{row.protein}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

//End Material ui Tables

const tableDataItems = [
  {
    id: '1',
    SNO: '1',
    FNAME: 'Bella',
    LNAME: 'Chloe',
    POSITION: 'System Developer',
    START: '2018/03/12',
    SALARY: '$654,765',
    MAIL: 'b.Chloe@datatables.net'
  },
  {
    id: '2',
    SNO: '2',
    FNAME: 'Donna',
    LNAME: 'Bond',
    POSITION: 'Account Manager',
    START: '2012/02/21',
    SALARY: '$543,654',
    MAIL: 'd.bond@datatables.net'
  },
  {
    id: '3',
    SNO: '3',
    FNAME: 'Harry',
    LNAME: 'Carr',
    POSITION: 'Technical Manager',
    START: '20011/02/87',
    SALARY: '$86,000',
    MAIL: 'h.carr@datatables.net'
  },
  {
    id: '4',
    SNO: '4',
    FNAME: 'Lucas',
    LNAME: 'Dyer',
    POSITION: 'Javascript Developer',
    START: '2014/08/23',
    SALARY: '$456,123',
    MAIL: 'l.dyer@datatables.net'
  },
  {
    id: '5',
    SNO: '5',
    FNAME: 'Karen',
    LNAME: 'Hill',
    POSITION: 'Sales Manager',
    START: '2010/7/14',
    SALARY: '$432,230',
    MAIL: 'k.hill@datatables.net'
  },
  {
    id: '6',
    SNO: '6',
    FNAME: 'Dominic',
    LNAME: 'Hudson',
    POSITION: 'Sales Assistant',
    START: '2015/10/16',
    SALARY: '$654,300',
    MAIL: 'd.hudson@datatables.net'
  },
  {
    id: '7',
    SNO: '7',
    FNAME: 'Herrod',
    LNAME: 'Chandler',
    POSITION: 'Integration Specialist',
    START: '2012/08/06',
    SALARY: '$137,500',
    MAIL: 'h.chandler@datatables.net'
  },
  {
    id: '8',
    SNO: '8',
    FNAME: 'Jonathan',
    LNAME: 'Ince',
    POSITION: 'junior Manager',
    START: '2012/11/23',
    SALARY: '$345,789',
    MAIL: 'j.ince@datatables.net'
  },
  {
    id: '9',
    SNO: '9',
    FNAME: 'Leonard',
    LNAME: 'Ellison',
    POSITION: 'Junior Javascript Developer',
    START: '2010/03/19',
    SALARY: '$205,500',
    MAIL: 'l.ellison@datatables.net'
  },
  {
    id: '10',
    SNO: '10',
    FNAME: 'Madeleine',
    LNAME: 'Lee',
    POSITION: 'Software Developer',
    START: '20015/8/23',
    SALARY: '$456,890',
    MAIL: 'm.lee@datatables.net'
  },
  {
    id: '11',
    SNO: '11',
    FNAME: 'Karen',
    LNAME: 'Miller',
    POSITION: 'Office Director',
    START: '2012/9/25',
    SALARY: '$87,654',
    MAIL: 'k.miller@datatables.net'
  },
  {
    id: '12',
    SNO: '12',
    FNAME: 'Lisa',
    LNAME: 'Smith',
    POSITION: 'Support Lead',
    START: '2011/05/21',
    SALARY: '$342,000',
    MAIL: 'l.simth@datatables.net'
  },
  {
    id: '13',
    SNO: '13',
    FNAME: 'Morgan',
    LNAME: 'Keith',
    POSITION: 'Accountant',
    START: '2012/11/27',
    SALARY: '$675,245',
    MAIL: 'm.keith@datatables.net'
  },
  {
    id: '14',
    SNO: '14',
    FNAME: 'Nathan',
    LNAME: 'Mills',
    POSITION: 'Senior Marketing Designer',
    START: '2014/10/8',
    SALARY: '$765,980',
    MAIL: 'n.mills@datatables.net'
  },
  {
    id: '15',
    SNO: '15',
    FNAME: 'Ruth',
    LNAME: 'May',
    POSITION: 'office Manager',
    START: '2010/03/17',
    SALARY: '$654,765',
    MAIL: 'r.may@datatables.net'
  },
  {
    id: '16',
    SNO: '16',
    FNAME: 'Penelope',
    LNAME: 'Ogden',
    POSITION: 'Marketing Manager',
    START: '2013/5/22',
    SALARY: '$345,510',
    MAIL: 'p.ogden@datatables.net'
  },
  {
    id: '17',
    SNO: '17',
    FNAME: 'Sean',
    LNAME: 'Piper',
    POSITION: 'Financial Officer',
    START: '2014/06/11',
    SALARY: '$725,000',
    MAIL: 's.piper@datatables.net'
  },
  {
    id: '18',
    SNO: '18',
    FNAME: 'Trevor',
    LNAME: 'Ross',
    POSITION: 'Systems Administrator',
    START: '2011/05/23',
    SALARY: '$237,500',
    MAIL: 't.ross@datatables.net'
  },
  {
    id: '19',
    SNO: '19',
    FNAME: 'Vanessa',
    LNAME: 'Robertson',
    POSITION: 'Software Designer',
    START: '2014/6/23',
    SALARY: '$765,654',
    MAIL: 'v.robertson@datatables.net'
  },
  {
    id: '20',
    SNO: '20',
    FNAME: 'Una',
    LNAME: 'Richard',
    POSITION: 'Personnel Manager',
    START: '2014/5/22',
    SALARY: '$765,290',
    MAIL: 'u.richard@datatables.net'
  },
  {
    id: '21',
    SNO: '21',
    FNAME: 'Justin',
    LNAME: 'Peters',
    POSITION: 'Development lead',
    START: '2013/10/23',
    SALARY: '$765,654',
    MAIL: 'j.peters@datatables.net'
  },
  {
    id: '22',
    SNO: '22',
    FNAME: 'Adrian',
    LNAME: 'Terry',
    POSITION: 'Marketing Officer',
    START: '2013/04/21',
    SALARY: '$543,769',
    MAIL: 'a.terry@datatables.net'
  },
  {
    id: '23',
    SNO: '23',
    FNAME: 'Cameron',
    LNAME: 'Watson',
    POSITION: 'Sales Support',
    START: '2013/9/7',
    SALARY: '$675,876',
    MAIL: 'c.watson@datatables.net'
  },
  {
    id: '24',
    SNO: '24',
    FNAME: 'Evan',
    LNAME: 'Terry',
    POSITION: 'Sales Manager',
    START: '2013/10/26',
    SALARY: '$66,340',
    MAIL: 'd.terry@datatables.net'
  },
  {
    id: '25',
    SNO: '25',
    FNAME: 'Angelica',
    LNAME: 'Ramos',
    POSITION: 'Chief Executive Officer',
    START: '20017/10/15',
    SALARY: '$6,234,000',
    MAIL: 'a.ramos@datatables.net'
  },
  {
    id: '26',
    SNO: '26',
    FNAME: 'Connor',
    LNAME: 'Johne',
    POSITION: 'Web Developer',
    START: '2011/1/25',
    SALARY: '$92,575',
    MAIL: 'C.johne@datatables.net'
  },
  {
    id: '27',
    SNO: '27',
    FNAME: 'Jennifer',
    LNAME: 'Chang',
    POSITION: 'Regional Director',
    START: '2012/17/11',
    SALARY: '$546,890',
    MAIL: 'j.chang@datatables.net'
  },
  {
    id: '28',
    SNO: '28',
    FNAME: 'Brenden',
    LNAME: 'Wagner',
    POSITION: 'Software Engineer',
    START: '2013/07/14',
    SALARY: '$206,850',
    MAIL: 'b.wagner@datatables.net'
  },
  {
    id: '29',
    SNO: '29',
    FNAME: 'Fiona',
    LNAME: 'Green',
    POSITION: 'Chief Operating Officer',
    START: '2015/06/23',
    SALARY: '$345,789',
    MAIL: 'f.green@datatables.net'
  },
  {
    id: '30',
    SNO: '30',
    FNAME: 'Shou',
    LNAME: 'Itou',
    POSITION: 'Regional Marketing',
    START: '2013/07/19',
    SALARY: '$335,300',
    MAIL: 's.itou@datatables.net'
  },
  {
    id: '31',
    SNO: '31',
    FNAME: 'Michelle',
    LNAME: 'House',
    POSITION: 'Integration Specialist',
    START: '2016/07/18',
    SALARY: '$76,890',
    MAIL: 'm.house@datatables.net'
  },
  {
    id: '32',
    SNO: '32',
    FNAME: 'Suki',
    LNAME: 'Burks',
    POSITION: 'Developer',
    START: '2010/11/45',
    SALARY: '$678,890',
    MAIL: 's.burks@datatables.net'
  },
  {
    id: '33',
    SNO: '33',
    FNAME: 'Prescott',
    LNAME: 'Bartlett',
    POSITION: 'Technical Author',
    START: '2014/12/25',
    SALARY: '$789,100',
    MAIL: 'p.bartlett@datatables.net'
  },
  {
    id: '34',
    SNO: '34',
    FNAME: 'Gavin',
    LNAME: 'Cortez',
    POSITION: 'Team Leader',
    START: '2015/1/19',
    SALARY: '$345,890',
    MAIL: 'g.cortez@datatables.net'
  },
  {
    id: '35',
    SNO: '35',
    FNAME: 'Martena',
    LNAME: 'Mccray',
    POSITION: 'Post-Sales support',
    START: '2011/03/09',
    SALARY: '$324,050',
    MAIL: 'm.mccray@datatables.net'
  },
  {
    id: '36',
    SNO: '36',
    FNAME: 'Unity',
    LNAME: 'Butler',
    POSITION: 'Marketing Designer',
    START: '2014/7/28',
    SALARY: '$34,983',
    MAIL: 'u.butler@datatables.net'
  },
  {
    id: '37',
    SNO: '37',
    FNAME: 'Howard',
    LNAME: 'Hatfield',
    POSITION: 'Office Manager',
    START: '2013/8/19',
    SALARY: '$98,000',
    MAIL: 'h.hatfield@datatables.net'
  },
  {
    id: '38',
    SNO: '38',
    FNAME: 'Hope',
    LNAME: 'Fuentes',
    POSITION: 'Secretary',
    START: '2015/07/28',
    SALARY: '$78,879',
    MAIL: 'h.fuentes@datatables.net'
  },
  {
    id: '39',
    SNO: '39',
    FNAME: 'Vivian',
    LNAME: 'Harrell',
    POSITION: 'Financial Controller',
    START: '2010/02/14',
    SALARY: '$452,500',
    MAIL: 'v.harrell@datatables.net'
  },
  {
    id: '40',
    SNO: '40',
    FNAME: 'Timothy',
    LNAME: 'Mooney',
    POSITION: 'Office Manager',
    START: '20016/12/11',
    SALARY: '$136,200',
    MAIL: 't.mooney@datatables.net'
  },
  {
    id: '41',
    SNO: '41',
    FNAME: 'Jackson',
    LNAME: 'Bradshaw',
    POSITION: 'Director',
    START: '2011/09/26',
    SALARY: '$645,750',
    MAIL: 'j.bradshaw@datatables.net'
  },
  {
    id: '42',
    SNO: '42',
    FNAME: 'Olivia',
    LNAME: 'Liang',
    POSITION: 'Support Engineer',
    START: '2014/02/03',
    SALARY: '$234,500',
    MAIL: 'o.liang@datatables.net'
  },
  {
    id: '43',
    SNO: '43',
    FNAME: 'Bruno',
    LNAME: 'Nash',
    POSITION: 'Software Engineer',
    START: '2015/05/03',
    SALARY: '$163,500',
    MAIL: 'b.nash@datatables.net'
  },
  {
    id: '44',
    SNO: '44',
    FNAME: 'Sakura',
    LNAME: 'Yamamoto',
    POSITION: 'Support Engineer',
    START: '2010/08/19',
    SALARY: '$139,575',
    MAIL: 's.yamamoto@datatables.net'
  },
  {
    id: '45',
    SNO: '45',
    FNAME: 'Thor',
    LNAME: 'Walton',
    POSITION: 'Developer',
    START: '2012/08/11',
    SALARY: '$98,540',
    MAIL: 't.walton@datatables.net'
  },
  {
    id: '46',
    SNO: '46',
    FNAME: 'Finn',
    LNAME: 'Camacho',
    POSITION: 'Support Engineer',
    START: '2016/07/07',
    SALARY: '$87,500',
    MAIL: 'f.camacho@datatables.net'
  },
  {
    id: '47',
    SNO: '47',
    FNAME: 'Serge',
    LNAME: 'Baldwin',
    POSITION: 'Data Coordinator',
    START: '2017/04/09',
    SALARY: '$138,575',
    MAIL: 's.baldwin@datatables.net'
  },
  {
    id: '48',
    SNO: '48',
    FNAME: 'Zenaida',
    LNAME: 'Frank',
    POSITION: 'Software Engineer',
    START: '2018/01/04',
    SALARY: '$125,250',
    MAIL: 'z.frank@datatables.net'
  },
  {
    id: '49',
    SNO: '49',
    FNAME: 'Zorita',
    LNAME: 'Serrano',
    POSITION: 'Software Engineer',
    START: '2017/06/01',
    SALARY: '$115,000',
    MAIL: 'z.serrano@datatables.net'
  },
  {
    id: '50',
    SNO: '50',
    FNAME: 'Jennifer',
    LNAME: 'Acosta',
    POSITION: 'Junior Javascript Developer',
    START: '2017/02/01',
    SALARY: '$75,650',
    MAIL: 'j.acosta@datatables.net'
  }
]

export function DataTabless () {
  const [selectedRows, setSelectedRows] = React.useState([])
  const [toggleCleared, setToggleCleared] = React.useState(false)
  const [data, setData] = React.useState(tableDataItems)

  const handleRowSelected = React.useCallback((state:any) => {
    setSelectedRows(state.selectedRows)
  }, [])

  const columns:any = [
    {
      name: 'S.NO',
      selector: (row:any) => [row.SNO],
      sortable: false
    },
    {
      name: 'FIRST NAME',
      selector: (row:any) => [row.FNAME],
      sortable: true
    },
    {
      name: 'LAST NAME',
      selector: (row:any) => [row.LNAME],
      sortable: false
    },
    {
      name: 'POSITION',
      selector: (row:any) => [row.POSITION],
      sortable: true
    },
    {
      name: 'START DATE',
      selector: (row:any) => [row.START],
      sortable: true
    },
    {
      name: 'SALARY',
      selector: (row:any) => [row.SALARY],
      sortable: true
    },
    {
      name: 'MAIL',
      selector: (row:any) => [row.MAIL],
      sortable: false
    }
  ]
  const contextActions = React.useMemo(() => {
    const handleDelete = (SNO:any) => {
      setToggleCleared(!toggleCleared)
      setData(differenceBy(data, selectedRows, 'SNO'))
    }

    return (
      <SpkButton variant="primary" customClass="ti-btn" key="delete" onclickfunc={handleDelete}>
        Delete
      </SpkButton>
    )
  }, [data, selectedRows, toggleCleared])
  const tableDatas:any = {
    columns,
    data
  }
  return (
    <span className="datatable">
      <DataTableExtensions {...tableDatas}>
        <DataTable
          title
          columns={columns}
          data={data}
          selectableRows
          contextActions={contextActions}
          onSelectedRowsChange={handleRowSelected}
          clearSelectedRows={toggleCleared}
          pagination
        />
      </DataTableExtensions>
    </span>
  )
}



/////
// CsV Table Data
function convertArrayOfObjectsToCSV (array:any) {
  let result:any

  const columnDelimiter = ','
  const lineDelimiter = '\n'
  const keys = Object.keys(data[0])

  result = ''
  result += keys.join(columnDelimiter)
  result += lineDelimiter

  array.forEach((item:any) => {
    let ctr = 0
    keys.forEach((key) => {
      if (ctr > 0) result += columnDelimiter

      result += item[key]

      ctr++
    })
    result += lineDelimiter
  })

  return result
}

// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
function downloadCSV (array:any) {
  const link = document.createElement('a')
  let csv = convertArrayOfObjectsToCSV(array)
  if (csv == null) return

  const filename = 'export.csv'

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`
  }

  link.setAttribute('href', encodeURI(csv))
  link.setAttribute('download', filename)
  link.click()
}

const Export = ({ onExport }:any) => (
  <SpkButton onclickfunc={(e:any) => onExport(e.target.value)} variant="primary" customClass='export-table ti-btn'>Export</SpkButton>
)
const data = [
  {
    id: '1',
    SNO: 1,
    NAME: 'Yonna',
    LASTNAME: 'Qond',
    POSITION: 'Financial Controller',
    DATE: '2012/02/21',
    SALARY: '$143,654',
    EMAIL: 'i.bond@datatables.net'
  },
  {
    id: '2',
    SNO: 2,
    NAME: 'Zonna',
    LASTNAME: 'Jond',
    POSITION: 'Accountant',
    DATE: '2012/02/21',
    SALARY: '$343,654',
    EMAIL: 'a.bond@datatables.net'
  },
  {
    id: '3',
    SNO: 3,
    NAME: 'Nonna',
    LASTNAME: 'Tond',
    POSITION: 'Chief Executive Officer',
    DATE: '2012/02/21',
    SALARY: '$743,654',
    EMAIL: 's.bond@datatables.net'
  },
  {
    id: '4',
    SNO: 4,
    NAME: 'Bonna',
    LASTNAME: 'Oond',
    POSITION: 'Chief Operating Officer',
    DATE: '2012/02/21',
    SALARY: '$643,654',
    EMAIL: 'w.bond@datatables.net'
  },
  {
    id: '5',
    SNO: 5,
    NAME: 'Honna',
    LASTNAME: 'Pond',
    POSITION: 'Data Coordinator',
    DATE: '2012/02/21',
    SALARY: '$243,654',
    EMAIL: 'e.bond@datatables.net'
  },
  {
    id: '6',
    SNO: 6,
    NAME: 'Fonna',
    LASTNAME: 'Nond',
    POSITION: 'Developer',
    DATE: '2012/02/21',
    SALARY: '$543,654',
    EMAIL: 'r.bond@datatables.net'
  },
  {
    id: '7',
    SNO: 7,
    NAME: 'Aonna',
    LASTNAME: 'Xond',
    POSITION: 'Development lead',
    DATE: '2012/02/21',
    SALARY: '$843,654',
    EMAIL: 'g.bond@datatables.net'
  },
  {
    id: '8',
    SNO: 8,
    NAME: 'Qonna',
    LASTNAME: 'Vond',
    POSITION: 'Director',
    DATE: '2012/02/21',
    SALARY: '$743,654',
    EMAIL: 'x.bond@datatables.net'
  },
  {
    id: '9',
    SNO: 9,
    NAME: 'Jond',
    LASTNAME: 'Zonna',
    POSITION: 'Marketing Officer',
    DATE: '2012/02/21',
    SALARY: '$543,654',
    EMAIL: 'k.bond@datatables.net'
  },
  {
    id: '10',
    SNO: 10,
    NAME: 'Yonna',
    LASTNAME: 'Qond',
    POSITION: 'Financial Controller',
    DATE: '2012/02/21',
    SALARY: '$143,654',
    EMAIL: 's.bond@datatables.net'
  },
  {
    id: '11',
    SNO: 11,
    NAME: 'Yonna',
    LASTNAME: 'Qond',
    POSITION: 'Financial Controller',
    DATE: '2012/02/21',
    SALARY: '$143,654',
    EMAIL: 'b.bond@datatables.net'
  },
  {
    id: '12',
    SNO: 12,
    NAME: 'Yonna',
    LASTNAME: 'Qond',
    POSITION: 'Financial Controller',
    DATE: '2012/02/21',
    SALARY: '$143,654',
    EMAIL: 'o.bond@datatables.net'
  },
  {
    id: '13',
    SNO: 13,
    NAME: 'Qonna',
    LASTNAME: 'Pond',
    POSITION: 'Data Coordinator',
    DATE: '2012/02/21',
    SALARY: '$243,654',
    EMAIL: 'q.bond@datatables.net'
  },
  {
    id: '14',
    SNO: 14,
    NAME: 'Yonna',
    LASTNAME: 'Qond',
    POSITION: 'Financial Controller',
    DATE: '2012/02/21',
    SALARY: '$143,654',
    EMAIL: 'm.bond@datatables.net'
  }
]
const columns1:any = [
  {
    name: 'S.NO',
    selector: (row:any) => [row.SNO],
    sortable: true
  },
  {
    name: 'NAME',
    selector: (row:any) => [row.NAME],
    sortable: true
  },
  {
    name: 'LAST NAME',
    selector: (row:any) => [row.LASTNAME],
    sortable: true
  },
  {
    name: 'POSITION',
    selector: (row:any) => [row.POSITION],
    sortable: true
  },
  {
    name: 'DATE',
    selector: (row:any) => [row.DATE],
    sortable: true
  },
  {
    name: ' SALARY',
    selector: (row:any) => [row.SALARY],
    sortable: true
  },
  {
    name: 'EMAIL',
    selector: (row:any) => [row.EMAIL],
    sortable: true
  }
]

export function ExportCSV () {
  const actionsMemo = React.useMemo(() => <Export onExport={() => { downloadCSV(data) }} />, [])
  const [selectedRows, setSelectedRows] = React.useState<any>([])
  const [toggleCleared, setToggleCleared] = React.useState(false)
  const selectdata:any = []
  const handleRowSelected = React.useCallback((state:any) => {
    setSelectedRows(state.selectedRows)
  }, [])
  const contextActions = React.useMemo(() => {
    const Selectdata = () => {
      if (window.confirm(`download:\r ${selectedRows.map((r:any) => r.SNO)}?`)) {
        setToggleCleared(!toggleCleared)
        data.map((e) => {
          selectedRows.map((sr:any) => {
            if (e.id === sr.id) {
              selectdata.push(e)
            }
            return selectedRows
          })
          return data
        })
        downloadCSV(selectdata)
      }
    }

    return <Export onExport={() => Selectdata()} icon="true" />
  }, [data, selectdata, selectedRows])
  const [allData, setAllData] = React.useState(data)

  const allElement2 :any= []

  const myfunction = (InputData:any) => {
    for (const allElement of data) {
      if (allElement.NAME.toLowerCase().includes(InputData.toLowerCase())) {
        if (allElement.NAME.toLowerCase().startsWith(InputData.toLowerCase())) {
          allElement2.push(allElement)
        }
      }
    }
    setAllData(allElement2)
  }

  return (
     <span className="datatable">
<label className="float-end">
    <input type="text" placeholder="Search..." className="mb-4 form-control-sm form-control" onChange={(ele) => { myfunction(ele.target.value) }}/>
    </label>

      <DataTable
        columns={columns1}
        data={allData}
        actions={actionsMemo}
        contextActions={contextActions}
        onSelectedRowsChange={handleRowSelected}
        clearSelectedRows={toggleCleared}
        selectableRows
        pagination
      />
    </span>
  )
}