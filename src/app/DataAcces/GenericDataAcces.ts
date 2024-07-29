import { AuthService } from '../Services/auth.service';

export abstract class GenericRepository<T> {
  protected abstract collectionName: string;
  private baseURL: string = 'http://localhost:8080/delande/api/';

  getToken(): string {
    return AuthService.getStoredUser().currentUser.token;
  }

  getAll(): Promise<T[]> {
    let headers: { Authorization?: string } = {};
    if (this.getToken()) {
      headers['Authorization'] = `Bearer ${this.getToken()}`;
    }
    return fetch(this.baseURL + this.collectionName, {
      headers: headers,
    }).then(async (response) => {
      const contentType = response.headers.get('content-type');
      if (response.status == 200) {
        if (contentType && contentType.includes('application/json')) {
          return await response.json(); // Parse JSON response
        } else {
          return response.text();
        }
      } else {
        throw new Error(await response.text());
      }
    });
  }

  getById(id: string): Promise<T> {
    let headers: { Authorization?: string } = {};
    if (this.getToken()) {
      headers['Authorization'] = `Bearer ${this.getToken()}`;
    }
    return fetch(this.baseURL + this.collectionName + '/' + id, {
      headers: headers,
    }).then(async (response) => {
      const contentType = response.headers.get('content-type');
      if (response.status == 200) {
        if (contentType && contentType.includes('application/json')) {
          return await response.json(); // Parse JSON response
        } else {
          return response.text();
        }
      } else {
        throw new Error(await response.text());
      }
    });
  }

  add(entity: T): Promise<T> {
    let headers: { 'content-Type': string; Authorization?: string } = {
      'content-Type': 'application/json',
    };
    if (this.getToken()) {
      headers['Authorization'] = `Bearer ${this.getToken()}`;
    }
    return fetch(this.baseURL + this.collectionName, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(entity),
    }).then(async (response) => {
      const contentType = response.headers.get('content-type');
      if (response.status == 200) {
        if (contentType && contentType.includes('application/json')) {
          return await response.json(); // Parse JSON response
        } else {
          return await response.text();
        }
      } else {
        throw new Error(await response.text());
      }
    });
  }

  update(entity: T): Promise<T> {
    let headers: { 'content-Type': string; Authorization?: string } = {
      'content-Type': 'application/json',
    };
    if (this.getToken()) {
      headers['Authorization'] = `Bearer ${this.getToken()}`;
    }
    return fetch(this.baseURL + this.collectionName, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(entity),
    }).then(async (response) => {
      const contentType = response.headers.get('content-type');
      if (response.status == 200) {
        if (contentType && contentType.includes('application/json')) {
          return await response.json(); // Parse JSON response
        } else {
          return response.text();
        }
      } else {
        throw new Error(await response.text());
      }
    });
  }

  delete(id: number): Promise<void> {
    let headers: { Authorization?: string } = {};
    if (this.getToken()) {
      headers['Authorization'] = `Bearer ${this.getToken()}`;
    }
    return fetch(this.baseURL + this.collectionName + '/' + id, {
      method: 'DELETE',
      headers: headers,
    }).then(async (response) => {
      const contentType = response.headers.get('content-type');
      if (response.status == 200) {
        if (contentType && contentType.includes('application/json')) {
          return await response.json(); // Parse JSON response
        } else {
          return response.text();
        }
      } else {
        throw new Error(await response.text());
      }
    });
  }
}
