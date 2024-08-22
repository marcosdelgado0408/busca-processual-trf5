import { Injectable } from '@angular/core';
import { Processo } from '../interfaces/processo';
import { IResultValuesService } from '../interfaces/IResultValuesService';

@Injectable({
  providedIn: 'root'
})

export class ResultValuesService implements IResultValuesService{
    processos: Processo[] = [];
    visibleProcessos: Processo[] = [];
    processosPorPagina = 5;
    paginaAtual = 1;
}