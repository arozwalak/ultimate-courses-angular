import { of } from 'rxjs';
import { StockInventoryService } from './stock-inventory.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

function createResponse(body: any) {
  return of(new HttpResponse({ body: JSON.stringify(body) }));
}

class MockHttp {
  get() {
    return createResponse([]);
  }
}

const cartItems = [
  { product_id: 1, quantity: 10 },
  { product_id: 2, quantity: 5 },
];

const productItems = [
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

  it('should get cart items', () => {});
});
