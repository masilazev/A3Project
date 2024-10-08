import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule, CommonModule, FormsModule],
      declarations: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle signup mode', () => {
    expect(component.signup).toBe(false);
    component.isSignup();
    expect(component.signup).toBe(true);
    component.isSignup();
    expect(component.signup).toBe(false);
  });

  it('should show error message if login fields are empty', () => {
    component.email = '';
    component.senha = '';
    component.auth();

    expect(component.isMessage).toBe(true);
    expect(component.message).toBe('ATENÇÃO: Preencha todos os campos.');
    expect(component.color).toBe('danger');
  });

  it('should show error message if user is not found in localStorage', () => {
    localStorage.removeItem('user_save');
    component.email = 'test@example.com';
    component.senha = '123456';
    component.auth();

    expect(component.isMessage).toBe(true);
    expect(component.message).toBe('ATENÇÃO: Usúario ou senha incorretos.');
    expect(component.color).toBe('danger');
  });

  it('should log in if correct credentials are provided', () => {
    const user = { name: 'John', email: 'test@example.com', senha: '123456' };
    localStorage.setItem('user_save', JSON.stringify(user));
    component.email = 'test@example.com';
    component.senha = '123456';
    component.auth();

    expect(component.isMessage).toBe(true);
    expect(component.message).toBe('Usário logado com sucesso.');
    expect(component.color).toBe('success');
  });

  /*
  TODO: teste de caso de uso de usuario salvo
  comentaado para validar depois com localstorage
  it('should register user if all fields are filled', () => {
    component.form.name = 'John Doe';
    component.form.email = 'john@example.com';
    component.form.senha = '123456';

    component.register();

    const user = localStorage.getItem('user_save');
    expect(user).toEqual(JSON.stringify(component.form));
    expect(component.isMessage).toBe(true);
    expect(component.message).toBe('Cadastro realizado com sucesso.');
    expect(component.color).toBe('success');
  });
  */

  it('should show error message if registration fields are empty', () => {
    component.form.name = '';
    component.form.email = '';
    component.form.senha = '';
    component.register();

    expect(component.isMessage).toBe(true);
    expect(component.message).toBe('ATENÇÃO: Preencha todos os campos.');
    expect(component.color).toBe('danger');
  });
});
