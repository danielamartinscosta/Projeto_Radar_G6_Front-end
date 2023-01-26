import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Campanha } from '../campanhas/campanhas.interface';
import { CampanhasService } from '../campanhas/campanhas.service';
import { Cliente } from '../clientes/clientes.interface';
import { ClientesService } from '../clientes/clientes.service';
import { Loja } from '../lojas/lojas.interface';
import { LojasService } from '../lojas/lojas.service';
import { Pedido } from '../pedidos/pedidos.interface';
import { PedidosService } from '../pedidos/pedidos.service';
import { Produto } from '../products/product.interface';
import { ProductsService } from '../products/products.service';
Chart.register(...registerables);


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  qntClients: number;
  qntProducts: number;
  qtdLojas: number;
  qtdCampanhas: number;
  qtdPedidos: number;

  prospeccao = [50, 60 ,80 ,70, 100, 150, 200, 210, 220, 250, 300, 350];
  real = [55, 66 ,88 ,77, 120, 170, 230, 240, 250, 260, 310, 300]

  constructor(
    private clienteService: ClientesService,
    private productService: ProductsService,
    private lojaService: LojasService,
    private campanhaService: CampanhasService,
    private pedidosService: PedidosService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.countClients();
    this.countProducts();
    this.countPedidos();
    this.countLojas();
    this.countCampanhas();

    var myChart = new Chart("myChart", {
      type: 'line',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [{
          label: 'Prospecção',
          data: this.prospeccao,
          borderWidth: 3,
          borderColor: '#40D90B'
        }, {
          label: 'Real',
          data: this.real,
          borderWidth: 3,
          borderColor: '#ff5510'
        } ],
        
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    var myChartPie = new Chart("myChartPie", {
      type: 'pie',
      data: {
        labels: ['Medicamentos', 'Vitaminas e Suplementos', 'Dermocosméticos', 'Perfumaria'],
        datasets: [{
          label: 'Vendas - R$',
          data: [500, 100, 900, 200],
          borderWidth: 0,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
      }
    });
  }


  countClients() {
    var token = this.authService.getToken();
    this.clienteService.getClientes(token).subscribe({
      next: (resp) => this.onSuccessClients(resp),
    });
  }

  onSuccessClients(resp: Cliente[]) {
    this.qntClients = resp.length;
  }

  countProducts() {
    var token = this.authService.getToken();
    this.productService.pegarProduto(token).subscribe({
      next: (resp) => this.onSuccessProducts(resp),
    });
  }

  onSuccessProducts(resp: Produto[]) {
    this.qntProducts = resp.length;
  }


  countLojas() {
    var token = this.authService.getToken();
    this.lojaService.pegarLoja(token).subscribe({
      next: (resp) => this.onSuccessLojas(resp),
    });
  }

  onSuccessLojas(resp: Loja[]) {
    this.qtdLojas = resp.length;
  }


  countCampanhas() {
    var token = this.authService.getToken();
    this.campanhaService.pegarCampanha(token).subscribe({
      next: (resp) => this.onSuccessCampanhas(resp),
    });
  }

  onSuccessCampanhas(resp: Campanha[]) {
    this.qtdCampanhas = resp.length;
  }


  countPedidos() {
    var token = this.authService.getToken();
    this.pedidosService.pegarPedido(token).subscribe({
      next: (resp) => this.onSuccessPedidos(resp),
    });
  }

  onSuccessPedidos(resp: Pedido[]) {
    this.qtdPedidos = resp.length;
  }
  }
