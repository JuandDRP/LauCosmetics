import {
  Component,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { RouterModule } from '@angular/router';

type SidebarGroupKey = 'cases';

enum SidebarItemKey {
  ver_productos = 'cases-ver-productos',
  actualizar_stock = 'cases-actualizar-stock',
  eliminar_venta = 'cases-eliminar-venta',
  agregar_venta = 'cases-agregar-venta',
  crear_producto = 'cases-crear-producto',
  calculadora = 'cases-calculadora'
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {

  expanded = signal(false);
  activeItem = signal<SidebarItemKey>(SidebarItemKey.ver_productos);
  SidebarItemKey = SidebarItemKey;

  readonly userName: string = 'Juan Perez';
  readonly userEmail: string = 'juan@geb.com.co';

  private readonly openGroups = new Set<SidebarGroupKey>(['cases']);

  toggleSidebar() {
    this.expanded.set(!this.expanded());
  }

  isGroupOpen(key: SidebarGroupKey): boolean {
    return this.openGroups.has(key);
  }

  toggleGroup(key: SidebarGroupKey): void {
    if (this.openGroups.has(key)) {
      this.openGroups.delete(key);
    } else {
      this.openGroups.add(key);
    }
  }

  setActive(key: SidebarItemKey): void {
    this.activeItem.set(key);
    this.expanded.set(false); // 🔥 siempre se cierra (modo overlay)
  }
}