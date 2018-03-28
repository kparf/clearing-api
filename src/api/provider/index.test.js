import request from 'supertest';
import { masterKey, apiRoot } from '../../config';
import { signSync } from '../../services/jwt';
import express from '../../services/express';
import routes, { User } from '.';

const app = () => express(apiRoot, routes);
