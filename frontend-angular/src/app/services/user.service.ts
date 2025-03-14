import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: number;
  website?: string;
}


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';
  private http = inject(HttpClient);

  /** Obtener todos los usuarios */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  /** Obtener un usuario por ID */
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /** Crear un usuario */
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user).pipe(
      catchError(this.handleError)
    );
  }

  /** Actualizar un usuario */
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user).pipe(
      catchError(this.handleError)
    );
  }

  /** Eliminar un usuario */
  deleteUser(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /** Manejo de errores HTTP */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMsg = 'Ocurrió un error desconocido';
    if (error.error instanceof ErrorEvent) {
      errorMsg = `Error: ${error.error.message}`;
    } else {
      errorMsg = `Error ${error.status}: ${error.message}`;
    }
    console.error(errorMsg);
    return throwError(() => new Error(errorMsg));
  }
}
