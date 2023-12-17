import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileSizePipe } from './file-size.pipe';
import { Component } from '@angular/core';

describe('FileSizePipe', () => {
  describe('Shallow FileSizePipe test', () => {
    @Component({
      template: ` Size: {{ size | filesize : suffix }} `,
    })
    class TestComponent {
      suffix!: string;
      size = 123456789;
    }

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let el: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [TestComponent, FileSizePipe],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      el = fixture.nativeElement;
    });

    it('should convert bytes to megabytes', () => {
      fixture.detectChanges();
      expect(el.textContent).toContain('Size: 117.74MB');

      component.size = 1029281;

      fixture.detectChanges();
      expect(el.textContent).toContain('Size: 0.98MB');
    });

    it('should use the default extension when not supplied', () => {
      fixture.detectChanges();
      expect(el.textContent).toContain('Size: 117.74MB');
    });

    it('should override the extension when supplied', () => {
      component.suffix = 'myExt';
      fixture.detectChanges();
      expect(el.textContent).toContain('Size: 117.74myExt');
    });
  });

  describe('Isolate FileSizePipe test', () => {
    const pipe = new FileSizePipe();

    it('should convert bytes to megabytes', () => {
      expect(pipe.transform(123456789)).toBe('117.74MB');
      expect(pipe.transform(987654321)).toBe('941.90MB');
    });

    it('should use the default extension when not supplied', () => {
      expect(pipe.transform(123456789)).toBe('117.74MB');
    });

    it('should override the extension when supplied', () => {
      expect(pipe.transform(123456789, 'megabytes')).toBe('117.74megabytes');
    });
  });
});
