'use client';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { format } from 'date-fns';
import { Input } from '../../components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import clsx from 'clsx';
import {
  Edit,
  FileSpreadsheet,
  Loader2,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import { School } from '../../types/types';
import Image from 'next/image';
import { deleteSchoolById } from '../../actions/schools';

export default function SchoolTable({
  title,
  schools,
}: {
  title: string;
  schools: School[];
}) {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const itemsPerPage = 10;
  const router = useRouter();

  // Filter meals based on search query
  const filteredSchools = useMemo(() => {
    if (!searchQuery.trim()) return schools;

    const query = searchQuery.toLowerCase();
    return schools.filter(
      (school) =>
        school.name.toLowerCase().includes(query) ||
        school.slug.toLowerCase().includes(query),
      // educationBackground.description.toLowerCase().includes(query),
    );
  }, [schools, searchQuery]);

  // Handle edit click
  // async function handleEditClick (meal: MealPropTypes) {
  //   setIsAddingNew(false);
  //   router.push(`/dashboard/meals/${meal.slug}`)
  //   setIsModalOpen(true);
  // };

  // Handle add new click
  const handleAddNewClick = () => {
    setIsAddingNew(true);
    setIsModalOpen(true);
  };

  // Handle delete click
  async function handleDeleteClick(schoolId: string) {
    try {
      if (schoolId) {
        setIsDeleting(schoolId);
      }
      const response = await deleteSchoolById(schoolId);
      console.log(response), 'Jesus';
      if (response) {
        setIsDeleting(null);
        toast.success('School Deleted successfully...✅');
        console.log(response);
        router.push('/management/super-dashboard/schools-page');
      } else {
        setIsDeleting(null);
        toast.error('Failed To Delete School...!!!🥺');
        console.log(response);
      }
    } catch (error) {
      setIsDeleting(null);
      toast.error('Failed to Delete School', {
        description:
          error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  }

  // Change page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredSchools.length / itemsPerPage);

  // Format date function
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'MMM dd, yyyy');
  };

  // Format currency
  //   const formatCurrency = (amount: number) => {
  //     return new Intl.NumberFormat('en-UG', {
  //       style: 'currency',
  //       currency: 'UGX',
  //       minimumFractionDigits: 0,
  //     }).format(amount);
  //   };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 5) {
      // Show all pages if 5 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show first page, current page and neighbors, and last page
      if (currentPage <= 3) {
        // Near the beginning
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('ellipsis');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pageNumbers.push(1);
        pageNumbers.push('ellipsis');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Middle
        pageNumbers.push(1);
        pageNumbers.push('ellipsis');
        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        pageNumbers.push(currentPage + 1);
        pageNumbers.push('ellipsis');
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  // Calculate current page items
const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const currentPageSchools = filteredSchools.slice(startIndex, endIndex);

  return (
    <>
      <Card className={clsx('w-full')}>
        <CardHeader
          className={clsx('flex flex-row items-center justify-between')}
        >
          <div>
            <CardTitle className={clsx('text-2xl text-blue-600/80')}>
              {title}
            </CardTitle>
            <p className={clsx('text-muted-foreground mt-1')}>
              {schools.length} {schools.length === 1 ? 'School' : 'Schools'}
            </p>
          </div>
          <Button
            variant="outline"
            className="border-blue-600/40 text-blue-600/80 hover:bg-blue-600/80 hover:text-white"
            onClick={handleAddNewClick}
          >
            {/* <Plus className={clsx('mr-2 h-4 w-4')} /> */}
            <Link href="/management/super-dashboard/schools-page/new">Add School</Link>
          </Button>
        </CardHeader>

        <CardContent>
          {/* Search and Export */}
          <div className={clsx('flex items-center justify-between mb-4')}>
            <div className={clsx('relative max-w-sm')}>
              <Search
                className={clsx(
                  'absolute left-2.5 top-2.5 h-4 w-4  text-blue-600/80',
                )}
              />
              <Input
                placeholder="Search school..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={clsx(
                  'pl-8 w-full md:w-80 border border-blue-600/40 focus:outline-none focus:ring-0',
                )}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className={clsx('absolute right-1 top-1.5 h-6 w-6')}
                  onClick={() => setSearchQuery('')}
                >
                  <X className={clsx('h-4 w-4')} />
                </Button>
              )}
            </div>
            <Button
              variant="outline"
              className="text-blue-600/80 border border-blue-600/40 hover:bg-blue-600/80 hover:text-white"
              disabled={isExporting}
            >
              {isExporting ? (
                <>
                  <Loader2 className={clsx('mr-2 h-4 w-4 animate-spin')} />
                  Exporting...
                </>
              ) : (
                <>
                  <FileSpreadsheet className={clsx('mr-2 h-4 w-4')} />
                  Export to Excel
                </>
              )}
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow >
                <TableHead className='text-blue-600/80'>School Logo</TableHead>
                <TableHead className='text-blue-600/80'>School Name</TableHead>
                <TableHead className='text-blue-600/80'>Created</TableHead>
                <TableHead className="text-blue-600/80 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPageSchools.length > 0 ? (
                currentPageSchools.map((school) => (
                  <TableRow key={school.id}>
                    <TableCell>
                      <Card className="w-20 h-auto rounded overflow-hidden shadow-lg">
                        <Image
                          className="h-full w-full object-fit-contain overflow-hidden"
                          src={school.logo || '/placeholder.jpg'}
                          alt={school.name}
                          height={500}
                          width={500}
                        />
                      </Card>
                    </TableCell>
                    <TableCell>{school.name}</TableCell>
                    <TableCell>{formatDate(school.createdAt)}</TableCell>
                    <TableCell className={clsx('text-right')}>
                      <div className={clsx('flex justify-end gap-2')}>
                        <Link href={`/management/school/dashboard/education-form/${school.id}`}>
                          <Button
                            variant="outline"
                            size="icon"
                            // onClick={() => handleEditClick(meal.slug)}
                            title="Edit School"
                            className="text-blue-600/80 border border-blue-600/40 hover:bg-blue-600/80 hover:text-white"
                          >
                            <Edit className={clsx('h-4 w-4')} />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="icon"
                          className={clsx(
                            'text-blue-600/80 border border-blue-600/40 hover:bg-blue-600/80 hover:text-white hover:text-destructive hover:bg-white hover:border hover:border-destructive',
                          )}
                          onClick={() => handleDeleteClick(school.id)}
                          disabled={isDeleting === school.id}
                          title="Delete School"
                        >
                          {isDeleting === school.id ? (
                            <Loader2 className={clsx('h-4 w-4 animate-spin')} />
                          ) : (
                            <Trash2 className={clsx('h-4 w-4')} />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className={clsx('text-center py-6')}>
                    {searchQuery
                      ? 'No matching schools found'
                      : 'No school found'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <div className={clsx('mt-4')}>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        handlePageChange(Math.max(1, currentPage - 1))
                      }
                      className={clsx(
                        currentPage === 1
                          ? 'pointer-events-none opacity-50'
                          : 'cursor-pointer',
                      )}
                    />
                  </PaginationItem>

                  {getPageNumbers().map((page, index) =>
                    page === 'ellipsis' ? (
                      <PaginationItem key={`ellipsis-${index}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={`page-${page}`}>
                        <PaginationLink
                          onClick={() => handlePageChange(page as number)}
                          className={clsx(
                            currentPage === page
                              ? 'bg-primary text-primary-foreground'
                              : 'cursor-pointer',
                          )}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ),
                  )}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        handlePageChange(Math.min(totalPages, currentPage + 1))
                      }
                      className={clsx(
                        currentPage === totalPages
                          ? 'pointer-events-none opacity-50'
                          : 'cursor-pointer',
                      )}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
