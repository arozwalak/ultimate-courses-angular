import { of } from 'rxjs';
import { StockInventoryService } from './stock-inventory.service';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Item, Product } from '../models/product.interface';

function createResponse(body: any) {
  return of(body);
}

class MockHttp {
  get() {
    return createResponse([]);
  }
}

const cartItems: Item[] = [
  { product_id: 1, quantity: 10 },
  { product_id: 2, quantity: 5 },
];

const productItems: Product[] = [
  { id: 1, price: 10, name: 'Test' },
  { id: 2, price: 100, name: 'Another test' },
];

describe('StockInventoryService', () => {
  let service: StockInventoryService;
  let httpClient: HttpClient;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [
        StockInventoryService,
        { provide: HttpClient, useClass: MockHttp },
      ],
    });

    httpClient = bed.inject(HttpClient);
    service = bed.inject(StockInventoryService);
  });

  it('should get cart items', () => {
    spyOn(httpClient, 'get').and.returnValue(createResponse([...cartItems]));

    service.getCartItems().subscribe((result: Item[]) => {
      expect(result.length).toBe(2);
      expect(result).toEqual(cartItems);
    });
  });

  it('should get product items', () => {
    spyOn(httpClient, 'get').and.returnValue(createResponse([...productItems]));

    service.getProducts().subscribe((result: Product[]) => {
      expect(result.length).toBe(2);
      expect(result).toEqual(productItems);
    });
  });
});
