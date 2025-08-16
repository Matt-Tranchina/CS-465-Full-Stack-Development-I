import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';
import { JwtInterceptor } from './jwt-interceptor';

describe('jwtInterceptor', () => {
  const jwtInterceptor: HttpInterceptorFn = (req, next) => 
    TestBed.runInInjectionContext(() => jwtInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(JwtInterceptor).toBeTruthy();
  });
});