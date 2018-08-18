/**
 * A tiny 3D linear algebra library.
 * 
 * @file      Contains common data types and basic functions used for 3D computations.
 * @author    Jonathan Karlsson
 * @copyright 2018-08-18. Free for any use.
 */

/**
 * Creates a 3D vector consisting of 3 numbers - X, Y, Z - each corresponding to a spatial dimension. Can be used to store coordinates or directions.
 *
 * @param {number} nx The value of X.
 * @param {number} ny The value of Y.
 * @param {number} nz The value of Z.
 *
 * @return {v3} The vector with value (nx, ny, nz).
 */
function v3(nx, ny, nz)
{
    return {
        x : Number(nx),
        y : Number(ny),
        z : Number(nz)
    };
}

/**
* Creates a string of a vector's values.
*
* @param {v3} v The vector to create a string from.
*
* @return {string} The vector as a string.
*/
function v3_str(v)
{
    return parseFloat(v.x).toFixed(2) + ", " + parseFloat(v.y).toFixed(2) + ", " + parseFloat(v.z).toFixed(2);
}

/**
 * Adds the the pairs of X, Y, and Z elements of two vectors and returns the resulting vector.
 *
 * @param {v3} vl The left-hand side vector.
 * @param {v3} vr The right-hand side vector.
 *
 * @return {v3} The resulting vector.
 */
function v3_add(vl, vr)
{
    return v3(
        vl.x + vr.x,
        vl.y + vr.y,
        vl.z + vr.z
    );
}

/**
 * Subtracts the right-hand side X, Y, and Z from the left-hand side X, Y, and Z and returns the resulting vector.
 *
 * @param {v3} vl The left-hand side vector.
 * @param {v3} vr The right-hand side vector.
 *
 * @return {v3} The resulting vector.
 */
function v3_sub(vl, vr)
{
    return v3(
        vl.x - vr.x,
        vl.y - vr.y,
        vl.z - vr.z
    );
}

/**
 * Multiplies the left-hand side X, Y, and Z with the right-hand side number and returns the resulting vector.
 *
 * @param {v3}     vl The left-hand side vector.
 * @param {number} nr The right-hand side number.
 *
 * @return {v3} The resulting vector.
 */
function v3_scale(vl, nr)
{
    return v3(
        vl.x * nr,
        vl.y * nr,
        vl.z * nr
    );
}

/**
 * Returns the length/distance (as a single number) between the input vector and the origin vector (X=0, Y=0, Z=0).
 *
 * @param {v3} v The vector to return the length of.
 *
 * @return {number} The length of the vector.
 */
function v3_len(v)
{
    return Math.sqrt(v.x*v.x + v.y*v.y + v.z*v.z);
}

/**
 * Returns the normalized/unit vector (i.e. vector of length=1) of the input vector.
 *
 * @param {v3} v The vector to return a normalized version of.
 *
 * @return {v3} The normalized/unit vector.
 */
function v3_unit(v)
{
    var inv_len = 1.0 / v3_len(v);
    return v3(
        v.x * inv_len,
        v.y * inv_len,
        v.z * inv_len
    
}

/** 
 * Returns the dot product between two vectors.
 *
 * @param {v3} vl The left-hand side vector.
 * @param {v3} vr The right-hand side vector.
 *
 * @return {number} The dot product.
 */
function v3_dot(vl, vr)
{
    return vl.x * vr.x + vl.y * vr.y + vl.z * vr.z;
}

/**
 * Returns the cross product between two vectors.
 *
 * @param {v3} vl The left-hand side vector.
 * @param {v3} vr The right-hand side vector.
 *
 * @return {v3} The cross product.
 */
function v3_cross(vl, vr)
{
    return v3(
        vl.y * vr.z - vl.z * vr.y,
        vl.z * vr.x - vl.x * vr.z,
        vl.x * vr.y - vl.y * vr.x
    );
}

/**
 * Creates a 3x3 matrix consisting of 3 3D vectors (X, Y, Z) - each corresponding to a 3D direction. Can be used to store rotations.
 *
 * @param {number} nxx The X number of the X vector.
 * @param {number} nxy The Y number of the X vector.
 * @param {number} nxz The Z number of the X vector.
 * @param {number} nyx The X number of the Y vector.
 * @param {number} nyy The Y number of the Y vector.
 * @param {number} nyz The Z number of the Y vector.
 * @param {number} nzx The X number of the Z vector.
 * @param {number} nzy The Y number of the Z vector.
 * @param {number} nzz The Z number of the Z vector.
 *
 * @return {m3x3} The matrix with value ((nxx, nxy, nxz), (nyx, nyy, nyz), (nzx, nzy, nzz)).
 */
function m3x3(nxx, nxy, nxz, nyx, nyy, nyz, nzx, nzy, nzz)
{
    return {
        x : v3(nxx, nxy, nxz),
        y : v3(nyx, nyy, nyz),
        z : v3(nzx, nzy, nzz)
    };
}

/**
 * Creates a string of a matrix's values.
 *
 * @param {m3x3} m The matrix to create a string from.
 *
 * @return {string} The matrix as a string.
 */
function m3x3_str(m)
{
    return v3_str(m.x) + "\n" + v3_str(m.y) + "\n" + v3_str(m.z);
}

/**
 * Creates a 3x3 identity matrix (diagonal 1.0's), corresponding to a "default" rotation.
 *
 * @return {m3x3} The identity matrix.
 */
function m3x3_identity()
{
    return m3x3(
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0
    );
}

/**
 * Transposes a matrix (rotates a matrix 90 degrees).
 *
 * @param {m3x3} m The matrix to return the transposed version of.
 *
 * @return {m3x3} The transposed matrix. 
 */
function m3x3_transp(m)
{
    return m3x3(
        m.x.x, m.y.x, m.z.x,
        m.x.y, m.y.y, m.z.y,
        m.x.z, m.y.z, m.z.z
    );
}

/**
 * Returns a Euler rotation matrix.
 *
 * @param {number} nhead  The 'head' rotation (rotation around NECK as axis - NO motion) in radians.
 * @param {number} npitch The 'pitch' rotation (rotation around EARS as axis - YES motion) in radians.
 * @param {number} nroll  The 'roll' rotation (rotation around NOSE axis) in radians.
 *
 * @return {m3x3} The Euler rotation matrix.
 */
function m3x3_euler(nhead, npitch, nroll)
{
    var SINH = Math.sin(nhead);
    var SINP = Math.sin(npitch);
    var SINR = Math.sin(nroll);
    var COSH = Math.cos(nhead);
    var COSP = Math.cos(npitch);
    var COSR = Math.cos(nroll);
    return m3x3(
        (COSR*COSH) - (SINR*SINP*SINH), -SINR*COSP, (COSR*SINH) + (SINR*SINP*COSH),
        (SINR*COSH) + (COSR*SINP*SINH), COSR*COSP,  (SINR*SINH) - (COSR*SINP*COSH),
        -COSP*SINH,                     SINP,       COSP*COSH,
    );
}

/**
 * Returns the inverted 3x3 matrix (m*inv(m)=identity).
 *
 * @param {m3x3} m The matrix to return the inverted version of.
 *
 * @return {m3x3} The inverted matrix.
 */
function v3_cross(vl, vr)
{
    return v3(
        vl.y * vr.z - vl.z * vr.y,
        vl.z * vr.x - vl.x * vr.z,
        vl.x * vr.y - vl.y * vr.x
    );
}
function m3x3_inv(m)
{
    var det =
        m.x.x * (m.y.y * m.z.z - m.z.y * m.y.z) -
        m.x.y * (m.y.x * m.z.z - m.y.z * m.z.x) +
        m.x.z * (m.y.x * m.z.y - m.y.y * m.z.x); 

    if (det == 0.0) { return m3x3_identity(); }
    var invdet = 1.0 / det;

    return m3x3(
        // x
        (m.y.y * m.z.z - m.z.y * m.y.z) * invdet, // x
        (m.x.z * m.z.y - m.x.y * m.z.z) * invdet, // y
        (m.x.y * m.y.z - m.x.z * m.y.y) * invdet, // z
        // y
        (m.y.z * m.z.x - m.y.x * m.z.z) * invdet, // x
        (m.x.x * m.z.z - m.x.z * m.z.x) * invdet, // y
        (m.y.x * m.x.z - m.x.x * m.y.z) * invdet, // z
        // z
        (m.y.x * m.z.y - m.z.x * m.y.y) * invdet, // x
        (m.z.x * m.x.y - m.x.x * m.z.y) * invdet, // y
        (m.x.x * m.y.y - m.y.x * m.x.y) * invdet // z
    );
}

/**
 * Multiplies a matrix with another matrix (NOTE: ml*mr != mr*ml). Can be used to combine rotations.
 *
 * @param {m3x3} ml The left-hand side matrix.
 * @param {m3x3} mr The right-hand side matrix.
 *
 * @return {m3x3} The resulting matrix.
 */
function m3x3_mul(ml, mr)
{
	var mtr = m3x3_transp(mr);
    return m3x3(
        v3_dot(ml.x, mtr.x), v3_dot(ml.x, mtr.y), v3_dot(ml.x, mtr.z),
        v3_dot(ml.y, mtr.x), v3_dot(ml.y, mtr.y), v3_dot(ml.y, mtr.z),
        v3_dot(ml.z, mtr.x), v3_dot(ml.z, mtr.y), v3_dot(ml.z, mtr.z)
    );
}

/**
 * Multiplies a vector with a matrix. Used to apply a rotation to (transform) a vector.
 *
 * @param {v3}   vl The left-hand side vector.
 * @param {m3x4} mr The right-hand side matrix.
 *
 * @return {v3} The transformed vector.
 */
function v3_m3x3_mul(vl, mr)
{
    return v3(
        v3_dot(vl, mr.x),
        v3_dot(vl, mr.y),
        v3_dot(vl, mr.z)
    );
}
