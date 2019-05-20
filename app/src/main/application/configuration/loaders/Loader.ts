import { Container, interfaces } from 'inversify';
import { IDependencyLoader } from 'infersify-context';

export abstract class Loader implements IDependencyLoader {
    public abstract load(container: Container): void;

    protected getComponent<T>(context: interfaces.Context, token: string | symbol): T {
        return context.container.get(token) as T;
    }
}
