import path from "path";
import express from "express";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const express = require("express");

const publicPath = path.join(__dirname, "public/");
const staticMiddlware = express.static(publicPath);

export default staticMiddlware;
