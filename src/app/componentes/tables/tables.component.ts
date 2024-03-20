import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TaskService } from '../../services/TaskService.service';
import Swal from 'sweetalert2'
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css'
})
export class TablesComponent implements OnInit, AfterViewInit {
  @Input() listData: any[];
  @Input() tipo: number;
  displayedColumns: string[] = ['nombre'];
  dataSource: MatTableDataSource<any>;
  filterResultado = "";
  resultsLength = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private taskService: TaskService) {

  }

  ngOnInit() {
    this.getColumns();
    console.log(this.listData, this.tipo);
  }

  getColumns() {
    if (this.tipo != 1) {
      this.displayedColumns.push('fechaInicio')
    }
    if (this.tipo == 3) {
      this.displayedColumns.push('fechaFin')
    }
    this.displayedColumns.push('actions')
    this.dataSource = new MatTableDataSource(this.listData);
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async deleteRegister(id: string) {
    try {
      await this.taskService.elimina_Task$(id);
      this.mostarSwetError('Delete', 'Tarea Eliminada Correctamente')
    } catch (error) {
      this.mostarSwetError('Error', error.error.message)
    }
  }

  mostarSwetError(titleS: string, message: string) {
    Swal.fire({
      title: titleS,
      text: message,
      icon: "error",
      timer: 1500
    });
  }
}