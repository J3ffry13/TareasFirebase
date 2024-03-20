import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { TaskService } from '../../services/TaskService.service';
import { LocalStorageService } from '../../services/LocalStorage.service';
import { TaskModel } from '../../models/TaskModel';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-historial-task',
  templateUrl: './historial-task.component.html',
  styleUrl: './historial-task.component.css'
})
export class HistorialTaskComponent implements OnInit {


  chart: any;
  chartCallback: any;
  total = 0;
  listInicados: TaskModel[] = []
  listPendiente: TaskModel[] = []
  listFinalizados: TaskModel[] = []
  updateFromInput = false;
  loading = true

  highcharts = Highcharts;

  chartOptionsPie: Highcharts.Options = {
    title: {
      text: 'Tareas Históricas',
      align: 'left'
    },
    chart:{
      backgroundColor: 'rgba(255, 255, 255, 0.377)',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        borderWidth: 2,
        cursor: 'pointer',
        innerSize: '40%',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b><br>{point.percentage}%',
          distance: 20
        }
      }
    },
    colors: [
      '#a2b6d5',
      '#00e272',
      '#fe6a35'
    ],
    lang: { noData: 'No hay Tareas disponibles.' },
    series: [{
      data: [],
      type: 'pie',
      // point: 
    }]
  };

  constructor(private taskService: TaskService,
    private localStorage: LocalStorageService) {
    this.chartCallback = (chart: any) => {
      this.chart = chart;
    };
  }

  ngOnInit() {
    this.loading = true;
    this.cargarListaDatos();
  }

  cargarListaDatos() {
    this.taskService.listarAllTasks$(this.getUser()).subscribe((result) => {
      this.listPendiente = result.filter(x => x.estado == 1);
      this.listInicados = result.filter(x => x.estado == 2);
      this.listFinalizados = result.filter(x => x.estado == 3);
      this.total = result.length
      this.generarDashboardTask();
      this.loading = false;
    });
  }

  generarDashboardTask() {
    const data = [
      { name: 'Pendientes', y: this.listPendiente.length },
      { name: 'Iniciados', y: this.listInicados.length },
      { name: 'Finalizados', y: this.listFinalizados.length }
    ];
    this.chartOptionsPie.subtitle = {
      text: `Total de tareas: ${this.total}`,
      align: 'left'
    },
      this.chartOptionsPie.series = [{ data, type: 'pie', name: 'Tareas Históricas' }];
    this.updateFromInput = true;
  }


  getUser() {
    return this.localStorage.obtenerItemDelLocalStorage('idUser');
  }
}