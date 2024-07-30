import { USerCache } from '../Common/UserCache';
import { AuthService } from '../Services/auth.service';

export abstract class GenericRepository {
  protected abstract collectionName: string;
  baseURL: string = 'http://localhost:8080/delande/api/';

  getToken(): string {
    return USerCache.getStoredUser().currentUser.token;
  }

  async getAll(): Promise<any> {
    let headers: { Authorization?: string } = {};
    if (this.getToken()) {
      headers['Authorization'] = `Bearer ${this.getToken()}`;
    }
    const response = await fetch(this.baseURL + this.collectionName, {
      headers: headers,
    });
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
  }

  async getById(id: string): Promise<any> {
    let headers: { Authorization?: string } = {};
    if (this.getToken()) {
      headers['Authorization'] = `Bearer ${this.getToken()}`;
    }
    const response = await fetch(this.baseURL + this.collectionName + '/' + id, {
      headers: headers,
    });
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
  }

  async add(entity: any): Promise<any> {
    let headers: { 'content-Type': string; Authorization?: string } = {
      'content-Type': 'application/json',
    };
    if (this.getToken()) {
      headers['Authorization'] = `Bearer ${this.getToken()}`;
    }
    const response = await fetch(this.baseURL + this.collectionName, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(entity),
    });
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
  }

  async update(entity: any): Promise<any> {
    let headers: { 'content-Type': string; Authorization?: string } = {
      'content-Type': 'application/json',
    };
    if (this.getToken()) {
      headers['Authorization'] = `Bearer ${this.getToken()}`;
    }
    const response = await fetch(this.baseURL + this.collectionName, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(entity),
    });
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
  }

  async delete(id: string): Promise<string> {
    let headers: { Authorization?: string } = {};
    if (this.getToken()) {
      headers['Authorization'] = `Bearer ${this.getToken()}`;
    }
    const response = await fetch(this.baseURL + this.collectionName + '/' + id, {
      method: 'DELETE',
      headers: headers,
    });
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
  }
}